import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatCheckboxModule,
  MatInputModule,
  MatCardModule
} from '@angular/material';
import { RouterModule } from '@angular/router';
import { WatchButtonComponent } from './watch-button/watch-button.component';
import { TalksAndFiltersComponent } from './talks-and-filters/talks-and-filters.component';
import { TalksComponent } from './talks/talks.component';
import { TalkDetailsComponent } from './talk-details/talk-details.component';
import { TalkComponent } from './talk/talk.component';
import { RateButtonComponent } from './rate-button/rate-button.component';
import { FormatRatingPipe } from './format-rating.pipe';
import { FiltersComponent } from './filters/filters.component';
import { Backend } from './backend';
import { WatchService } from './watch';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromTalks from './+state/talks.reducer';
import { TalksEffects } from './+state/talks.effects';
import { NxModule } from '@nrwl/angular';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { StoreRouterConnectingModule } from '@ngrx/router-store';

@NgModule({
  declarations: [
    AppComponent,
    WatchButtonComponent,
    TalksAndFiltersComponent,
    TalksComponent,
    TalkDetailsComponent,
    TalkComponent,
    RateButtonComponent,
    FormatRatingPipe,
    FiltersComponent
  ],
  imports: [
    NoopAnimationsModule,
    BrowserModule,
    HttpClientModule,
    MatInputModule,
    MatCheckboxModule,
    MatCardModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: '', pathMatch: 'full', redirectTo: '/talks' },
      { path: 'talks', component: TalksAndFiltersComponent },
      { path: 'talk/:id', component: TalkDetailsComponent }
    ]),
    NxModule.forRoot(),
    StoreModule.forRoot(
      {},
      {
        metaReducers: !environment.production ? [] : [],
        runtimeChecks: {
          strictActionImmutability: true,
          strictStateImmutability: true
        }
      }
    ),
    EffectsModule.forRoot([TalksEffects]),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    StoreRouterConnectingModule.forRoot(),
    StoreModule.forFeature(fromTalks.TALKS_FEATURE_KEY, fromTalks.reducer)
  ],
  providers: [Backend, WatchService],
  bootstrap: [AppComponent]
})
export class AppModule {}
