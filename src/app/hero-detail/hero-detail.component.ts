import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
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
  returnPage: number;

  constructor(private heroService: HeroService, private route: ActivatedRoute, private router: Router) { }

  handleReturn(): void {
    this.router.navigate(
      ['/heroes'],
      {
        relativeTo: this.route,
        queryParams: {page: this.returnPage},
        queryParamsHandling: 'merge'
      }
    )
  }

  ngOnInit(): void {
    this.loading = true;
    this.route.params
    .pipe(
      switchMap(res => {
        this.returnPage = Math.ceil((parseInt(res.id)/10));
        return this.heroService.getHero(parseInt(res.id))
      }),
      )
      .subscribe(res => {
        this.hero = res;
        this.loading = false;
      })    
   }
}
