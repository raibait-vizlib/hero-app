import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { debounceTime, distinct, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Hero } from '../hero.interface';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-hero-list',
  templateUrl: './hero-list.component.html',
  styleUrls: ['./hero-list.component.scss']
})

export class HeroListComponent implements OnInit{
  heroes: Hero[] = [];
  nextPage: string
  prevPage: string;
  loading: boolean = false;
  search = new FormControl('');
  
  extractId(url: string): number{
    const urlArr = url.split('/');
    return parseInt(urlArr[urlArr.length-2]);
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
    this.loading = true;
    this.route.queryParams
    .pipe(
      switchMap(params=> {
        return this.heroService.getHeroes(params.page, params.search);
      })
    )
    .subscribe((heroList) => {
      this.heroes = heroList.results;
      this.prevPage = heroList.previous;
      this.nextPage = heroList.next;
      this.loading = false;
    })

    this.search.valueChanges
    .pipe(
      debounceTime(500),
      distinctUntilChanged()
    )
    .subscribe(searchQuery=> {
      this.router.navigate(
        [],
        {
          relativeTo: this.route,
          queryParams: {page: 1, search: searchQuery},
          queryParamsHandling: 'merge'
        }
    )
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
