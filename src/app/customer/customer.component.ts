import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { EMPTY, from, fromEvent, of, Subject } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { CustomerService } from './customer.service';

@Component({
  selector: 'dl-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CustomerComponent {

  private errorMessageSubject = new Subject<string>();
  errorMessage$ = this.errorMessageSubject.asObservable();

  customers$ = this.customerService.customersWithAdd$
    .pipe(
      tap(user => console.log(`${JSON.stringify(user)} in customer component`)),
      catchError(err => {
        this.errorMessageSubject.next(err);
        return EMPTY;
      })
    );

  constructor(private customerService: CustomerService) {
    this.prime();
  }

  onAdd() {
    this.customerService.addCustomer()
  }
  prime() {
    const a = 11;
    const b = 12;

    console.log(`XOR of ${a} and ${b} is ${a ^ b}`);
  };
}

