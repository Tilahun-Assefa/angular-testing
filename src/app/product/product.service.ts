import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, InjectionToken } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

export class Product {

  votes?: number;
 
  constructor(public sku: string, public name: string, public imageUrl: string, public department: string[],  public link: string, votes?: number, price?: number) {    
    this.votes = votes || 0;
  }
  voteUp() {
    this.votes++;
  }
  voteDown() {
    this.votes--;
  }

  domain(): string {
    try {
      const domainAndPath: string = this.link.split('//')[1];
      return domainAndPath.split('/')[0];
    } catch (err) {
      return null;
    }
  }
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  product$ = this.http.get<Product>('http://api/product')
    .pipe(
      catchError(err => {
        console.log('Handlling locally', err.message);
        return throwError(()=>err);
      })
    );
}
