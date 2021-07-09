import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ResponseList } from './response-list.interface';
import { Hero } from './hero.interface';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HeroService {
  
  constructor(private http: HttpClient) { }
  
  getHeroes(pageNumber: number, searchQuery: string): Observable<ResponseList<Hero>>{
    const heroesUrl = `https://swapi.dev/api/people/?${searchQuery ? `search=${searchQuery}&` : ''}page=${pageNumber}`;
    return this.http.get<ResponseList<Hero>>(heroesUrl);
  }
}