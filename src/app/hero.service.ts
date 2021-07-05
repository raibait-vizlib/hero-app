import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Hero } from './hero';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HeroService {
  private heroesUrl = 'https://swapi.dev/api/people/';

  constructor(private http: HttpClient) { }

  getHeroes(): Observable<Hero[]> { 
    return this.http.get<Hero[]>(this.heroesUrl);
  }
}