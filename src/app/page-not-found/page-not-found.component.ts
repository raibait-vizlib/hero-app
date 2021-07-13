import { Component} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.scss']
})
export class PageNotFoundComponent {
  constructor(private route: ActivatedRoute, private router: Router) {
  }

  handleReturn(): void{
    this.router.navigate(
      ['/heroes'],
      {
        relativeTo: this.route,
        queryParams: {page: 1},
        queryParamsHandling: 'merge'
      }
    )
  }
}
