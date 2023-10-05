import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Hero } from './hero';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() { 
    const heroes =[  
      { id: 12, name: 'Dr. Nice' },
      { id: 13, name: 'Bombasto' },
      { id: 14, name: 'Celeritas' },
      { id: 15, name: 'Magneta' },
      { id: 16, name: 'RubberMan' },
      { id: 17, name: 'Dynama' },
      { id: 18, name: 'Dr. IQ' },
      { id: 19, name: 'Magma' },
      { id: 20, name: 'Tornado' }
  ];
  return{heroes};
  }
  //Substitui o método genId para garantir que um herói sempre tenha um id
  //Se a matriz de heróis estiver vazia,
  //o método abaixo retorna o número inicial (11).
  // if the heroes array is not empty, the method below returns the highest
  //ID do herói + 1.
  genId(heroes: Hero[]): number { 
    return heroes.length > 0 ? Math.max(...heroes.map(hero => hero.id)) +1 : 11;
   }
}
