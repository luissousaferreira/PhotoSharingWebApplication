import { Injectable } from '@angular/core';
import { Photo } from './photo';

import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class PhotoService {
  private photoUrl = 'http://appserver.alunos.di.fc.ul.pt:3001/api/';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  /** GET photos from the server */
  getLikedPhotos(): Observable<Photo[]> {
    return this.http.get<Photo[]>(this.photoUrl + 'photos_most_liked')
      .pipe(
        catchError(this.handleError<Photo[]>('getPhotos', []))
      );
  }

  /** GET photos from the server */
  getRecentPhotos(): Observable<Photo[]> {
    return this.http.get<Photo[]>(this.photoUrl + 'photos_recent')
      .pipe(
        catchError(this.handleError<Photo[]>('getPhotos', []))
      );
  }

  /** GET user by id. Will 404 if id not found */
  getPhoto(id: string): Observable<Photo> {
    const url = `${this.photoUrl}photo/${id}`;
    return this.http.get<Photo>(url).pipe(
      catchError(this.handleError<Photo>(`get id=${id}`))
    );
  }

  /** POST: add a new photo to the server */
  addPhoto(photo: Photo): Observable<Photo> {
    return this.http.post<Photo>(this.photoUrl + 'photo/', photo, this.httpOptions).pipe(
      catchError(
        this.handleError<Photo>('addphoto')
      )
    );
  }

  deletePhoto(id: string): Observable<Photo> {
    const url = `${this.photoUrl}photo/${id}`;
    return this.http.delete<Photo>(url).pipe(
      catchError(
        this.handleError<Photo>('deletephoto')
      )
    );
  }
  /* PUT: Faz um update da foto*/
  updatePhoto(photo: Photo): Observable<any> {
    return this.http.put(this.photoUrl + 'photo/' + photo._id, photo, this.httpOptions).pipe(
      catchError(this.handleError<any>('updatePhoto'))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}

