import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { GetTeams, IGetResults } from '../interface';
@Injectable({
  providedIn: 'root',
})
export class AppService {
  url = 'https://free-nba.p.rapidapi.com';
  logoUrl = 'https://interstate21.com/nba-logos';
  constructor(private http: HttpClient) {}

  getTeams(): Observable<GetTeams> {
    return this.http
      .get<GetTeams>(this.url + `/teams`)
      .pipe(catchError(this.handleError));
  }

  getPast12DaysResults(team_ids: number): Observable<IGetResults> {
    const today = new Date();
    const twelveDaysAgo = new Date();
    twelveDaysAgo.setDate(today.getDate() - 12);
    const dateArray = [];

    for (let i = 0; i < 13; i++) {
      dateArray.push(twelveDaysAgo.toISOString().split('T')[0]);
      twelveDaysAgo.setDate(twelveDaysAgo.getDate() + 1);
    }

    return this.http
      .get<IGetResults>(
        `https://free-nba.p.rapidapi.com/games?team_ids[]=${team_ids}&dates[]=` +
          dateArray.join('&dates[]=')
      )
      .pipe(catchError(this.handleError));
  }

  handleError(err: HttpErrorResponse) {
    let message = '';

    if (err.error instanceof ErrorEvent) {
      message = `an error occured: ${err.error.message}`;
    } else {
      message = err.error;
    }

    return throwError(message);
  }
}
