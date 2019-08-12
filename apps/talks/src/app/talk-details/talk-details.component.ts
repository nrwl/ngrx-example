import { Component, Input } from '@angular/core';
import { Backend } from '../backend';
import { ActivatedRoute } from '@angular/router';
import { WatchService } from '../watch';
import { Store } from '@ngrx/store';
import { Talk } from '@ngrx-example/api-interfaces';
import { TalksState } from '../+state/talks.reducer';
import { rate, watch } from '../+state/talks.actions';

@Component({
  selector: 'talk-details-cmp',
  templateUrl: './talk-details.component.html',
  styleUrls: ['./talk-details.component.css']
})
export class TalkDetailsComponent {
  talk: Talk;
  isWatched: boolean;

  constructor(private route: ActivatedRoute, private store: Store<TalksState>) {
    store.select('talks').subscribe(t => {
      const id = +route.snapshot.paramMap.get('id');
      this.talk = t.entities[id];
      this.isWatched = t.watched[id];
    });
  }

  handleRate(newRating: number): void {
    this.store.dispatch(rate({ talkId: this.talk.id, rating: newRating }));
  }

  handleWatch(): void {
    this.store.dispatch(watch({ talkId: this.talk.id }));
  }
}
