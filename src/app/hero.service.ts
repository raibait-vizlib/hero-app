import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Hero } from './hero';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HeroService {
  
  constructor(private http: HttpClient) { }
  
  getHeroes(num){
    const heroesUrl = `https://swapi.dev/api/people/?page=${num}`;
    return this.http.get(heroesUrl).pipe(map((res:{results:Hero[] }) => res.results));
  }
}