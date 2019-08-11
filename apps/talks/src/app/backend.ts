import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Filters } from './model';
import { Talk } from '@ngrx-example/api-interfaces';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class Backend {
  talks: Talk[] = [];
  filters: Filters = { speaker: null, title: null, minRating: 0 };

  constructor(private http: HttpClient) {
    this.refetch();
  }

  findTalk(id: number): Observable<Talk> {
    const cachedTalks = this.talks ? this.talks.filter(t => t.id === id) : [];
    if (cachedTalks.length > 0) {
      return of(cachedTalks[0]);
    }
    return this.http.get<Talk>(`/api/talk?id=${id}`);
  }

  rateTalk(talk: Talk, rating: number): void {
    this.http
      .post(`/api/rate`, { id: talk.id, yourRating: rating })
      .subscribe();
  }

  changeFilters(filters: Filters): void {
    this.filters = filters;
    this.refetch();
  }

  private refetch(): void {
    this.http
      .get<Talk[]>(
        `/api/talks?speaker=${encodeURIComponent(
          this.filters.speaker ? this.filters.speaker : ''
        )}&title=${encodeURIComponent(
          this.filters.title ? this.filters.title : ''
        )}&minRating=${encodeURIComponent(
          this.filters.minRating.toString()
            ? this.filters.minRating.toString()
            : '0'
        )}`
      )
      .subscribe(talks => {
        this.talks = talks;
      });
  }
}
