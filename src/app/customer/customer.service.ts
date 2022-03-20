import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { merge, Observable, of, Subject, throwError } from 'rxjs';
import { catchError, scan, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Customer } from './customer';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http: HttpClient) { }

  public customers$ = this.http.get<Customer[]>(`${environment.apiUrl}/customers`)
    .pipe(
      tap(user => console.log(`user in customer service ${user}`)),
      catchError(
        this.handleError
      ));

  private handleError(err) {
    let errorMessage: string;
    if (err.error instanceof ErrorEvent) {
      errorMessage = `An error occured ${err}`;
    } else {
      errorMessage = `${err}`;
    }
    return throwError(()=>new Error(errorMessage));
  }

  private insertCustomerSubject = new Subject<Customer>();
  insertCustomerAction$ = this.insertCustomerSubject.asObservable();

  customersWithAdd$ = merge(this.customers$, this.insertCustomerAction$)
    .pipe(
      scan((acc: Customer[], value: Customer) => [...acc, value])
    )

  addCustomer(newCustomer?: Customer): void {
    newCustomer = newCustomer || { id: 4, username: 'hu', password: '123' };
    this.insertCustomerSubject.next(newCustomer);
  }
}
