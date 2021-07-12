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
  emptySearch: boolean = false;
  search = new FormControl('');

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

  constructor(private heroService: HeroService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.loading = true;
    this.route.queryParams
    .pipe(
      switchMap(res=> {
        return this.heroService.getHeroes(res.page, res.search);
      })
    )
    .subscribe((res) => {
      if(res.count > 0){
        this.heroes = res.results;
        this.prevPage = res.previous;
        this.nextPage = res.next;
        this.emptySearch = false;
      } else {
        this.heroes = []
        this.prevPage = null;
        this.nextPage = null;
        this.emptySearch = true;
      }
      this.loading = false;
    })

    this.search.valueChanges
    .pipe(
      debounceTime(500),
      distinctUntilChanged()
    )
    .subscribe(res=> {
      this.router.navigate(
        [],
        {
          relativeTo: this.route,
          queryParams: {page: 1, search: res},
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
