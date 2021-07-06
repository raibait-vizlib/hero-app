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

  getHeroes(num): void {
    this.heroService.getHeroes(num).subscribe((res) => {this.heroes = res});
  }

  handleNextPage(): void {
    if(this.pageNumber < 8){
      this.pageNumber += 1;
      this.getHeroes(this.pageNumber);
    }
  }

  handlePreviousPage(): void {
    if(this.pageNumber > 1){
      this.pageNumber -= 1;
      this.getHeroes(this.pageNumber);
    }
  }

  constructor(private heroService: HeroService) { }

  ngOnInit(): void {
    this.getHeroes(this.pageNumber);
  }

}
