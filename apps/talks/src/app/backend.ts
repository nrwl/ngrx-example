import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Talk } from '@ngrx-example/api-interfaces';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Filters } from './+state/talks.model';

@Injectable()
export class Backend {
  constructor(private readonly http: HttpClient) {}

  findTalks(filters: Filters): Observable<Talk[]> {
    return this.http.get<Talk[]>(
      `/api/talks?speaker=${encodeURIComponent(
        filters.speaker ? filters.speaker : ''
      )}&title=${encodeURIComponent(
        filters.title ? filters.title : ''
      )}&minRating=${encodeURIComponent(
        filters.minRating.toString() ? filters.minRating.toString() : '0'
      )}`
    );
  }

  findTalk(id: number): Observable<Talk> {
    return this.http.get<Talk>(`/api/talk?id=${id}`);
  }

  rateTalk(id: number, rating: number) {
    return this.http.post(`/api/rate`, { id, yourRating: rating });
  }
}
