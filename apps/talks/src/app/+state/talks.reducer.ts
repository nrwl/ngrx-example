import { createReducer, on, Action } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import * as TalksActions from './talks.actions';
import { Talk } from '@ngrx-example/api-interfaces';
import { Filters } from './talks.model';

export const TALKS_FEATURE_KEY = 'talks';

export interface TalksState extends EntityState<Talk> {
  filters: Filters;
  watched: { [id: number]: boolean };
}

export interface TalksPartialState {
  readonly [TALKS_FEATURE_KEY]: TalksState;
}

export const talksAdapter: EntityAdapter<Talk> = createEntityAdapter<Talk>();

export const initialState: TalksState = talksAdapter.getInitialState({
  filters: { speaker: '', title: '', minRating: 0 },
  watched: {}
});

const talksReducer = createReducer(
  initialState,
  on(TalksActions.talksUpdated, (state, { talks, filters }) =>
    talksAdapter.addAll(talks, { ...state, filters })
  ),
  on(TalksActions.talkUpdated, (state, { talk }) =>
    talksAdapter.upsertOne(talk, state)
  ),
  on(TalksActions.rate, (state, { talkId, rating }) =>
    talksAdapter.updateOne(
      { id: talkId, changes: { yourRating: rating } },
      state
    )
  ),
  on(TalksActions.unrate, (state, { talkId }) =>
    talksAdapter.updateOne({ id: talkId, changes: { yourRating: null } }, state)
  ),
  on(TalksActions.watch, (state, { talkId }) => ({
    ...state,
    watched: { ...state.watched, [talkId]: true }
  }))
);

export function reducer(state: TalksState | undefined, action: Action) {
  return talksReducer(state, action);
}
