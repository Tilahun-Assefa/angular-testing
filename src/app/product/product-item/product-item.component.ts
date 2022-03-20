import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { ProductModule } from '../product.module';
import { Product } from '../product.service';

@Component({
  selector: 'dl-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent implements OnInit {
  @HostBinding('attr.class') cssClass = 'row';
  @Input() item: Product;

  constructor() {    
  }

  ngOnInit(): void {
  }

  voteUp() {
    this.item.voteUp();
    return false;
  }
  voteDown() {
    this.item.voteDown();
    return false;
  }
}
