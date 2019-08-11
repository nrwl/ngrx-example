import { Component, Inject } from '@angular/core';
import { Backend } from '../backend';
import { Filters, createFiltersObject } from '../model';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-cmp',
  templateUrl: './talks-and-filters.component.html',
  styleUrls: ['./talks-and-filters.component.css']
})
export class TalksAndFiltersComponent {
  constructor(
    public app: Backend,
    private router: Router,
    private route: ActivatedRoute
  ) {
    route.queryParams.subscribe(p => {
      this.app.changeFilters(createFiltersObject(p as any));
    });
  }

  handleFiltersChange(filters: Filters): void {
    this.app.changeFilters(filters);
    this.router.navigate(['/'], { queryParams: filters });
  }
}
