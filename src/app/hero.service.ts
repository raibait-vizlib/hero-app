import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import {Hero} from './hero';
import { HEROES } from './mock-heroes';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HeroService {
  // private heroesUrl = 'https://superheroapi.com/api/4025045517609315/search/batman';
  private heroesUrl = 'https://swapi.dev/api/people/';

  constructor(private http: HttpClient) { }

  getHeroes(): Observable<any> { 
    // const headerDict = {
    //   'x-rapidapi-key': 'b0e4e1e864msh90944bd9a785585p1b5088jsn514fd2a5d106',
    //   'x-rapidapi-host': 'free-nba.p.rapidapi.com'
    // }
    // const requestOptions = {                                                                                                                                                                                 
    //   headers: new HttpHeaders(headerDict), 
    // };
    return this.http.get<any>(this.heroesUrl);
  }
}