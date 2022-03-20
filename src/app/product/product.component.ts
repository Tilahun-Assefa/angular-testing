import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { from, Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Customer } from '../customer/customer';
import { Product } from './product.service';

@Component({
  selector: 'dl-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductComponent {
  items: Product[];

  constructor() {
    this.items = [
      new Product('Angular',"Book Angular 11 Version", '/assets/images/products/black-hat.tag',['Books', 'Programming', 'Javascript'],"http://AV.net/books"),
      new Product('C#','Book .NetCore 3.1 Version','/assets/images/products/black-hat.tag',['Books', 'Programming', 'NET'],'http://DF.com/references'),
      new Product('SQL',"Book SQL Transaction Version", '/assets/images/products/black-hat.tag',['Books', 'Database', 'SQL'],"http://Buckner.org/items/books")
    ];
  }

  addItem(title: HTMLInputElement, link: HTMLInputElement): boolean {

    this.items.push(new Product('',title.value, '',[],link.value, 0));
    title.value = '';
    link.value = '';
    return false;
  }

  sortedItems(): Product[] {
    return this.items.sort((a: Product, b: Product) => b.votes - a.votes);
  }

  productSelected(product: Product){
    console.log('product clicked:', product);
  }
}
