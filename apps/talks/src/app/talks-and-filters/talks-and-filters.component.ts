import { Component, Inject } from '@angular/core';
import { Router, Params } from '@angular/router';
import { Store, State } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Filters } from '../+state/talks.model';
import { Talk } from '@ngrx-example/api-interfaces';
import { map } from 'rxjs/operators';
import { TalksPartialState, talksAdapter } from '../+state/talks.reducer';

@Component({
  selector: 'app-cmp',
  templateUrl: './talks-and-filters.component.html',
  styleUrls: ['./talks-and-filters.component.css']
})
export class TalksAndFiltersComponent {
  filters: Observable<Filters>;
  talks: Observable<Talk[]>;

  constructor(private router: Router, store: Store<TalksPartialState>) {
    this.filters = store.select('talks', 'filters');
    this.talks = store
      .select('talks')
      .pipe(map(talksAdapter.getSelectors().selectAll));
  }

  handleFiltersChange(filters: Filters): void {
    this.router.navigate(['/talks', this.createParams(filters)]);
  }

  private createParams(filters: Filters): Params {
    const r: any = {};
    if (filters.speaker) r.speaker = filters.speaker;
    if (filters.title) r.title = filters.title;
    if (filters.minRating) r.minRating = filters.minRating;
    return r;
  }
}
