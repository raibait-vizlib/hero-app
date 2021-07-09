import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { pipe } from 'rxjs';
import { finalize, map, switchMap, tap } from 'rxjs/operators';
import { Hero } from '../hero.interface';
import { HeroService } from '../hero.service';


@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.scss']
})
export class HeroDetailComponent implements OnInit {
  hero: Hero;
  loading: boolean = false;

  constructor(private heroService: HeroService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.loading = true;
    this.route.params
    .pipe(
      switchMap(res => {
        return this.heroService.getHero(parseInt(res.id))
      }),
      )
      .subscribe(res => {
        this.hero = res;
        this.loading = false;
      })    
   }
}
