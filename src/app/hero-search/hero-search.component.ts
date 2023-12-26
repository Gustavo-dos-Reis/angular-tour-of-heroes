import { Component, OnInit } from '@angular/core';

import { Observable, Subject } from 'rxjs';

import {
  debounceTime, distinctUntilChanged, switchMap
} from 'rxjs/operators';

import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-hero-search',
  templateUrl: './hero-search.component.html',
  styleUrls: ['./hero-search.component.css']
})
export class HeroSearchComponent implements OnInit {
  heroes$!: Observable<Hero[]>;
  private searchTerms = new Subject<string>();

  constructor(private heroService: HeroService) {}

  //Push um termo de pesquisa no observable.
  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.heroes$ = this.searchTerms.pipe(
      // espera 300 ms após cada pressionamento de tecla antes de considerar o termo
      debounceTime(300),

      //ignora o novo termo se for igual ao termo anterior
      distinctUntilChanged(),

      // muda para uma nova pesquisa observável cada vez que o termo muda
      switchMap((term:string) => 
      this.heroService.searchHeroes(term)),
    );
  }
}
