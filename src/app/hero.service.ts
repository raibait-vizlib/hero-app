import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Hero } from './hero';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HeroService {
  private heroesUrl = 'https://swapi.dev/api/people/';

  constructor(private http: HttpClient) { }

  getHeroes(){
    return this.http.get(this.heroesUrl).pipe(map((res:{results:Hero[] }) => res.results));
  }
}