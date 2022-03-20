import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { OrderLine } from '../sales.service';

@Component({
  selector: 'dl-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {
  currentorderline: OrderLine;
  
  @Input() orderlist: OrderLine[];

  @Output() onOrderlineSelected: EventEmitter<any>;


  displayedColumns: string[] = ['sku', 'name', 'imageUrl', 'price'];
  

  constructor() { 
    this.onOrderlineSelected = new EventEmitter(); 
   
  }

  ngOnInit(): void {
  }

  clicked(orderline: OrderLine): void{
    this.currentorderline= orderline;
    this.onOrderlineSelected.emit(orderline);
  }

  isSelected(orderline: OrderLine):boolean{
    if(!orderline || !this.currentorderline){
      return false;
    }
    return orderline.sku === this.currentorderline.sku;
  }

}
