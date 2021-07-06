import { Component, OnInit } from '@angular/core';
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
  maxPage: number = 9;
  minPage: number = 1;

  getHeroes(num): void {
    this.heroService.getHeroes(num).subscribe((res) => {this.heroes = res.results});
  }

  handleNextPage(): void {
    this.pageNumber += 1;
    this.getHeroes(this.pageNumber);
  }

  handlePreviousPage(): void {
    this.pageNumber -= 1;
    this.getHeroes(this.pageNumber);
  }

  constructor(private heroService: HeroService) { }

  ngOnInit(): void {
    this.getHeroes(this.pageNumber);
  }

}
