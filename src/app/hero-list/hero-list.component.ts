import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize, tap } from 'rxjs/operators';
import { Hero } from '../hero.interface';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-hero-list',
  templateUrl: './hero-list.component.html',
  styleUrls: ['./hero-list.component.scss']
})

export class HeroListComponent implements OnInit {
  heroes: Hero[] = [];
  nextPage: string
  prevPage: string;
  loading: boolean = false;

  extractId(url: string): number{
    const urlArr = url.split('/');
    return parseInt(urlArr[urlArr.length-2]);
  }

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

  handleNextPage(): void {
    this.router.navigate(
      [],
      {
        relativeTo: this.route,
        queryParams: {page: parseInt(this.route.snapshot.queryParams.page) + 1},
        queryParamsHandling: 'merge'
      }
    )
  }

  handlePreviousPage(): void {
    this.router.navigate(
      [],
      {
        relativeTo: this.route,
        queryParams: {page: parseInt(this.route.snapshot.queryParams.page) - 1},
        queryParamsHandling: 'merge'
      }
    )
  }

  onHeroClick(hero: Hero): void{
    const heroId: number = this.extractId(hero.url);
    this.router.navigate([`heroes/${heroId}`]);
  }

  constructor(private heroService: HeroService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(res=> {
      this.getHeroes(parseInt(res.page)).subscribe();
    })

    if(!this.route.snapshot.queryParams.page){
      this.router.navigate(
        [],
        {
          relativeTo: this.route,
          queryParams: {page: 1},
          queryParamsHandling: 'merge'
        }
    )
    }
  }
}
