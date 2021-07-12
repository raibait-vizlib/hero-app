import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, mergeMap } from 'rxjs/operators';
import { Observable, forkJoin, of } from 'rxjs';

import { ResponseList } from './response-list.interface';
import { Hero } from './hero.interface';
import { Planet } from './planet.interface';
import { Film } from './film.interface';
import { Species } from './species.interface';
import { Starship } from './starship.interface';
import { Vehicle } from './vehicle.interface';



@Injectable({
  providedIn: 'root'
})
export class HeroService {
  
  constructor(private http: HttpClient) { }
  
  getHeroes(pageNumber: number, searchQuery: string): Observable<ResponseList<Hero>>{
    const heroesUrl = `https://swapi.dev/api/people/?${searchQuery ? `search=${searchQuery}&` : ''}page=${pageNumber}`;
    return this.http.get<ResponseList<Hero>>(heroesUrl);
  }

  getPlanet(planetUrl: string): Observable<Planet>{
    return this.http.get<Planet>(planetUrl);
  }

  getFilm(filmUrl: string): Observable<Film>{
    return this.http.get<Film>(filmUrl);
  }

  getSpecies(speciesUrl: string): Observable<Species>{
    return this.http.get<Species>(speciesUrl);
  }

  getStarship(starshipUrl: string): Observable<Starship>{
    return this.http.get<Starship>(starshipUrl);
  }

  getVehicle(vehicleUrl: string): Observable<Vehicle>{
      return this.http.get<Vehicle>(vehicleUrl);
  }

  getHero(heroId: number): Observable<Hero>{
    const heroUrl = `https://swapi.dev/api/people/${heroId}`
    return this.http.get<any>(heroUrl).pipe(
      mergeMap((hero: Hero) => {
        if(hero.homeworld.length){
          return forkJoin([this.getPlanet(hero.homeworld)]).pipe(
            map((res: [Planet]) => {            
              return {
                ...hero,
                homeworld: res[0].name
              };
  
            }),
          )
        } else {
          return of(hero);
        }
      }),
      mergeMap((hero: Hero) => {
        if(hero.films.length){
          return forkJoin(hero.films.map(film => this.getFilm(film))).pipe(
            map((res: Film[]) => {
              const filmTitles = res.map(film => film.title);
              return{
                ...hero, 
                films: filmTitles,
              }
            }),
          )
        } else {
          return of(hero);
        }
        },
      ),
      mergeMap((hero: Hero) => {
        if(hero.starships.length){
          return forkJoin(hero.starships.map(starship => this.getStarship(starship))).pipe(
            map((res: Starship[]) => {
              const starshipNames = res.map(starship => starship.name);
              return{
                ...hero, 
                starships: starshipNames,
              }
            }),
          )
        } else {
          return of(hero);
        }
        },
      ),
      mergeMap((hero: Hero) => {
        if(hero.vehicles.length){
          return forkJoin(hero.vehicles.map(vehicles => this.getVehicle(vehicles))).pipe(
            map((res: Vehicle[]) => {
              const vehicleNames = res.map(vehicle => vehicle.name);
              return{
                ...hero, 
                vehicles: vehicleNames,
              }
            }),
          )
        } else {
          return of(hero);
        }
        },
      ),
      mergeMap((hero: Hero) => {
        if(hero.species.length){
          return forkJoin(hero.species.map(spec => this.getSpecies(spec))).pipe(
            map((res: Species[]) => {
              const speciesTitles = res.map(spec => spec.name);
              return{
                ...hero, 
                species: speciesTitles,
              }
            }),
          )
        }else{
          hero.species = ['Human'];
          return of(hero);
        }
      }),
    )
  }
}