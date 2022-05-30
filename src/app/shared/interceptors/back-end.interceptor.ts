import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse, HttpErrorResponse, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, delay, dematerialize, map, materialize, mergeMap, tap } from 'rxjs/operators';
import { Customer } from '../../customer/customer';

const users: Customer[] = [
  { id: 1, username: 'Barry', password: 'Tom' },
  { id: 1, username: 'Tom', password: 't@t' },
  { id: 2, username: 'James', password: 'j@t' },
  { id: 3, username: 'Tilahun', password: 't@tmail' }
];

@Injectable()
export class BackEndInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const { url, method, headers, body } = request;
    return of(null)
      .pipe(
        tap(res => console.log(res)),
        mergeMap(handleRoute),
        materialize(),
        tap(res => console.log(res)),
        delay(500),
        dematerialize(),
        catchError(err => {          
          return throwError(() => err);
        })
      );

    function handleRoute() {
      switch (true) {
        case url.endsWith('/customer/authenticate') && method === 'POST':
          return authenticate();
        // case url.endsWith('/api/products') && method === 'GET':
        //   return getProducts();
        case url.endsWith('/customers') && method === 'GET':
          return getUsers();

        //this can query from the api
        default: return next.handle(request);
      }
    }

    function authenticate() {
      const { username, password } = body;
      const user = users.find(u => u.username === username && u.password === password);
      if (!user) {
        return error('Username or password is incorrect');
      }
      return ok({ id: user.id, username: user.username, password: user.password });
    }

    function getUsers() {
      if (isLoggedOn()) return unauthorized();
      return ok(users);
    }

    function ok(body?) {
      return of(new HttpResponse({ status: 200, body }));
    }

    function ErrorUser(message) {
      return throwError(new HttpErrorResponse({ status: 401, url, error: { message } }));
    }

    function error(message) {
      return throwError(() => { error: message })
    }

    function unauthorized() {
      return throwError({ status: 401, error: { message: 'Unauthorized' } });
    }

    function isLoggedOn() {
      return headers.get('Authorization') === `Bearer ${window.btoa('test: test')}`;
    }
  }
}

//Backend for testing in place of HTTP backend 
// export let backEndProvider = {
//   provide: HTTP_INTERCEPTORS, useClass: BackEndInterceptor, multi: true
// }