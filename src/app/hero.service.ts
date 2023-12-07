import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';



import { Hero } from './hero';
import { HEROES } from './mock-heroes';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root',
})
export class HeroService {
  private heroesUrl ='api/heroes'; //URL para web api
  
  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }


  /**
  * Lidar com operação HTTP que falhou.
  * Deixe o aplicativo continuar.
  *
  * @param operação – nome da operação que falhou
  * @param result – valor opcional a ser retornado como resultado observável
  */

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable <T> => {

      // TODO: envia o erro para a infraestrutura de registro remoto
      console.error(error); //logar no console em vez disso

      // TODO: melhor trabalho de transformação de erros para consumo do usuário
      this.log(`${operation} failed: ${error.message}`);

      //Deixe o app continuar em execussão retornando um resultado vazio
      return of(result as T)

    }
  }

  getHero(id: number): Observable<Hero> {
  const url = `${this.heroesUrl}/${id}`;
  return this.http.get<Hero>(url).pipe(
    tap(_ => this.log(`fetched hero id=${id}`)),
    catchError(this.handleError<Hero>(`getHero id=${id}`))
  );
  }

  getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(this.heroesUrl)
      .pipe(
        tap(_ => this.log('fetched heroes')),
        catchError(this.handleError<Hero[]>('getHeroes', []))
      );
  }

  /*Registrar uma mensagem HeroService com o MessageService*/
  private log(message:string){
    this.messageService.add (`HeroService: $(message)`); 
  }
  
  /*Put:atualize o heroi no servidor */
  updateHero(hero: Hero): Observable<any> {
    return this.http.put(this.heroesUrl, hero, this.httpOptions).pipe(
      tap(_=> this.log(`updated hero id=${hero.id}`)),
      catchError(this.handleError<any>('updateHero'))
    )
  }

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  }

}
