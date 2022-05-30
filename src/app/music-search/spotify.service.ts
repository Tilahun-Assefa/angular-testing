import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, map, scan, tap } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {
  static BASE_URL = "https://api.spotify.com/v1";

  constructor(public http: HttpClient) { }

  query(URL: string, params?: Array<string>): Observable<any[]> {
    let queryURL = `${SpotifyService.BASE_URL}${URL}`;
    if (params) {
      queryURL = `${queryURL}?${params.join('&')}`;
    }
    const apiKey = environment.spotifyApiKey;

    const options = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${apiKey}`
      })
    };

    return this.http.get<any[]>(queryURL, options)
      .pipe(
        catchError(this.handleError)
      );
  }

  search(query: string, type: string): Observable<any[]> {
    return this.query(`/search`, [`q=${query}`, `type=${type}`])
  }

  searchTrack(query: string) {
    return this.search(query, 'track')
      .pipe(
        map(res => JSON.stringify(res))
      );
  }

  getTrack(id: string): Observable<any[]> {
    return this.query(`/tracks/${id}`);
  }

  getArtist(id: string): Observable<any[]> {
    return this.query(`/artists/${id}`);
  }

  getAlbum(id: string): Observable<any[]> {
    return this.query(`/albums/${id}`);
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }
}
