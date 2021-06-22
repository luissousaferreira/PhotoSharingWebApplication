import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userUrl = 'http://appserver.alunos.di.fc.ul.pt:3001/api/';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient
  ) { }

  /** GET users from the server */
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.userUrl + 'users')
      .pipe(
        catchError(this.handleError<User[]>('getUsers', []))
      );
  }

  /** GET user by id. Will 404 if id not found */
  getUser(id: string): Observable<User> {
    const url = `${this.userUrl}user/${id}`;
    return this.http.get<User>(url).pipe(
      catchError(this.handleError<User>(`getUser id=${id}`))
    );
  }


  /** POST: add a new user to the server */
  addUser(user: User): Observable<User> {
    console.log(user);
    return this.http.post<User>(this.userUrl + 'user/', user, this.httpOptions).pipe(
      catchError(this.handleError<User>('addUser'))
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
  updateUser(user: User): Observable<any> {
    return this.http.put(this.userUrl + 'user/' + user._id, user, this.httpOptions).pipe(
      catchError(this.handleError<any>('updateUser'))
    );
  }

}
