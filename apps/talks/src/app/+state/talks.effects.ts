import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { DataPersistence, navigation, optimisticUpdate } from '@nrwl/angular';

import { TalksPartialState } from './talks.reducer';
import * as TalksActions from './talks.actions';
import { TalksAndFiltersComponent } from '../talks-and-filters/talks-and-filters.component';
import { ActivatedRouteSnapshot, Params } from '@angular/router';
import { Backend } from '../backend';
import { map, switchAll, switchMap } from 'rxjs/operators';
import { createFiltersObject, Filters } from './talks.model';
import { TalkDetailsComponent } from '../talk-details/talk-details.component';
import { of } from 'rxjs';
import { WatchService } from '../watch';

@Injectable()
export class TalksEffects {
  talks$ = createEffect(() =>
    this.actions.pipe(
      navigation(TalksAndFiltersComponent, {
        run: (r: ActivatedRouteSnapshot) => {
          const filters = createFilters(r.params as any);
          return this.backend
            .findTalks(filters)
            .pipe(map(talks => TalksActions.talksUpdated({ talks, filters })));
        },

        onError: (r: ActivatedRouteSnapshot, error) => {
          console.error('Error', error);
          throw error;
        }
      })
    )
  );

  talk$ = createEffect(() =>
    this.actions.pipe(
      navigation(TalkDetailsComponent, {
        run: (r: ActivatedRouteSnapshot, state: TalksPartialState) => {
          const id = +r.paramMap.get('id');
          if (!state.talks.entities[id]) {
            return this.backend
              .findTalk(+r.paramMap.get('id'))
              .pipe(map(talk => TalksActions.talkUpdated({ talk })));
          } else {
            return of();
          }
        },

        onError: (r: ActivatedRouteSnapshot, error) => {
          console.error('Error', error);
          throw error;
        }
      })
    )
  );

  rate$ = createEffect(() =>
    this.actions.pipe(
      ofType(TalksActions.rate),
      optimisticUpdate({
        run: a => {
          return this.backend
            .rateTalk(a.talkId, a.rating)
            .pipe(switchMap(() => of<any>()));
        },
        undoAction: (a, e) => {
          return TalksActions.unrate({ talkId: a.talkId, error: e });
        }
      })
    )
  );

  watch$ = createEffect(() =>
    this.actions.pipe(
      ofType(TalksActions.watch),
      optimisticUpdate({
        run: a => {
          this.watch.watch(a.talkId);
          return of();
        },
        undoAction: (a, e) => {
          // cannot fail
          return of();
        }
      })
    )
  );

  constructor(
    private readonly backend: Backend,
    private readonly watch: WatchService,
    private readonly actions: Actions
  ) {}
}

function createFilters(p: Params): Filters {
  return {
    speaker: p['speaker'] || null,
    title: p['title'] || null,
    minRating: p['minRating'] ? +p['minRating'] : 0
  };
}
