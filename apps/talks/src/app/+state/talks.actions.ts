import { createAction, props } from '@ngrx/store';
import { Talk } from '@ngrx-example/api-interfaces';
import { Filters } from './talks.model';

export const talksUpdated = createAction(
  '[Talks] Talks Updated',
  props<{ talks: Talk[]; filters: Filters }>()
);

export const talkUpdated = createAction(
  '[Talks] Talk Updated',
  props<{ talk: Talk }>()
);

export const watch = createAction('[Talks] Watch', props<{ talkId: number }>());

export const talkWatched = createAction(
  '[Talks] Talk Watched',
  props<{ talkId: number }>()
);

export const rate = createAction(
  '[Talks] Rate',
  props<{ talkId: number; rating: number }>()
);

export const unrate = createAction(
  '[Talks] Unrate',
  props<{ talkId: number; error: any }>()
);
