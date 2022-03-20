import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Customer } from '../customer/customer';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private userSubject: BehaviorSubject<Customer>;
  public user$: Observable<Customer>;

  constructor(private http: HttpClient, private router: Router) {
    this.userSubject = new BehaviorSubject<Customer>(JSON.parse(localStorage.getItem('user')));
    this.user$ = this.userSubject.asObservable();
  }

  public get userValue(): Customer {
    return this.userSubject.value;
  }

  login(username: string, password: string) {
    return this.http.post<any>(`${environment.apiUrl}/customer/authenticate`, { username, password })
      .pipe(
        map(user => {
          //store customer detail and basic credentials in local storage
          user.authdata = window.btoa(username + ':' + password);
          localStorage.setItem('user', JSON.stringify(user));
          this.userSubject.next(user);
          return user
        }),
        catchError(err => {
          return throwError(() => new Error('Either Incorrect Username or Password'));
        })
      );
  }

  logout() {
    //log out user by removing from local storage
    localStorage.removeItem('user');
    this.userSubject.next(null);
    this.router.navigate(['/login']);
  }
}
