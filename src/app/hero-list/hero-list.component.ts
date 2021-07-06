import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-hero-list',
  templateUrl: './hero-list.component.html',
  styleUrls: ['./hero-list.component.scss']
})
export class HeroListComponent implements OnInit {
  heroes: Hero[] = [];
  pageNumber: number = 1;
  nextPage: string;
  prevPage: string;
  loading: boolean = false;

  getHeroes(pageNumber: number) {
    this.loading = true;
    return this.heroService.getHeroes(pageNumber).pipe(
      tap((res) => {
      this.heroes = res.results;
      this.prevPage = res.previous;
      this.nextPage = res.next;
    }), finalize(() => {
      this.loading = false;
    })
    );
  }
  getNextHeroes(pageNumber: number): void {
    this.getHeroes(pageNumber + 1).subscribe(() => {
      this.pageNumber += 1;
    })
  }
  getPrevHeroes(pageNumber: number): void {
    this.getHeroes(pageNumber - 1).subscribe(() => {
      this.pageNumber -= 1;
    })
  }

  handleNextPage(): void {
    this.getNextHeroes(this.pageNumber);
  }

  handlePreviousPage(): void {
    this.getPrevHeroes(this.pageNumber);
  }

  constructor(private heroService: HeroService) { }

  ngOnInit(): void {
    this.getHeroes(this.pageNumber).subscribe();
  }
}

