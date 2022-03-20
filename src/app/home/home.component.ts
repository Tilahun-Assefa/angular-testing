import { NgStyle } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { BehaviorSubject, fromEvent, of, Subject } from 'rxjs';
import { catchError, delay, first, map, mergeMap, tap } from 'rxjs/operators';
import { CustomerService } from '../customer/customer.service';
import { AuthService } from '../login/auth.service';


@Component({
  selector: 'dl-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit {

  loading: boolean = false;
  name: string;
  button = document.querySelector('button');
  result: string[] = 'Is this all there is?'.split(/[h]/g);
  test = /e/.exec('The best things in life are free!');
  searchIndex = this.test.index

  constructor(private auth: AuthService, private customerService: CustomerService) {
  }
  private loadingSubject = new BehaviorSubject<boolean>(true);
  loading$ = this.loadingSubject.asObservable();

  username$ = this.auth.user$.pipe(
    map(user => {
      return user.username;
    })
  );

  customers$ = this.customerService.customersWithAdd$.pipe(
    first(),
    delay(500),
    tap(customers => console.log(`${customers} in home component`)),
    map(customers => {
      this.loadingSubject.next(false);
      return customers;
    })
  )

  ngOnInit(): void {
    // faking network request for save observable of any type
    function saveLocation(location) {
      return of(location).pipe(delay(500));
    }
    // event streams
    const click$ = fromEvent(document, 'click');

    click$.pipe(
      mergeMap((e: MouseEvent) => {
        return saveLocation({
          x: e.clientX,
          y: e.clientY,
          timestamp: Date.now()
        });
      })
    ).subscribe(r => console.log('Saved!', r));     // output "Saved! {x: 98, y: 170, ...}" 

  }

  logout() {
    this.auth.logout();
  }
}
