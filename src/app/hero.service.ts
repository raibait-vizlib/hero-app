import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ResponseList } from './response-list';
import { Hero } from './hero';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HeroService {
  
  constructor(private http: HttpClient) { }
  
  getHeroes(num): Observable<ResponseList<Hero>>{
    const heroesUrl = `https://swapi.dev/api/people/?page=${num}`;
    return this.http.get<ResponseList<Hero>>(heroesUrl);
  }
}