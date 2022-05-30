import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { AuthService } from 'src/app/login/auth.service';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      tap(res =>{
       console.log(`response in errorinterceptor ${JSON.stringify(res['body'])}`);
      }),
      catchError(err => {
        if (err.status === 401) {
          //auto logout if 401 is returned from api
          // this.authService.logout();
        }
        if (err.status === 403) {
          //auto logout if 401 is returned from api
          console.log(`response in errorinterceptor catch error 403 ${err}`);
        }
        const error = err.error.message || err.statusText;
        return throwError(() => new Error("catch error in error interceptor"));
      })
    );
  }
}
