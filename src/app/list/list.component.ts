import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-hero-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  heroes: Hero[] = [];

  getHeroes(): void {
    this.heroService.getHeroes().subscribe((res) => {this.heroes = res});
  }

  constructor(private heroService: HeroService) { }

  ngOnInit(): void {
    this.getHeroes();
  }

}
