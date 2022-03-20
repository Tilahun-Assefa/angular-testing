import { Component, OnInit } from '@angular/core';
import { OrderLine } from './sales.service';

@Component({
  selector: 'dl-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.css']
})
export class SalesComponent implements OnInit {

  orderlines: OrderLine[];

  constructor() {
    this.orderlines = [
      { sku: 'Vibrant', name: 'Hiking Shoes', imageUrl: '/assets/images/products/shoe.jpg', department: ['Men', 'Shoes', 'Hiking Shoes'], price: 45.99, quantity: 2 },
      { sku: 'Auger', name: 'Blue Jacket', imageUrl: '/assets/images/products/jacket.jpg', department: ['Women', 'Apparel', 'Jacket and Vestes'], price: 67.99, quantity: 3 },
      { sku: 'NiceHat', name: 'Nike black hat', imageUrl: '/assets/images/products/hat.jpg', department: ['Men', 'Accesories', 'Hats'], price: 15.99, quantity: 1 },
      { sku: 'TShirt', name: 'Polo T-Shirt', imageUrl: '/assets/images/products/shirt.jpg', department: ['Men', 'Tshirt', 'Polo Shirts'], price: 5.99, quantity: 2 }
    ];
  }

  ngOnInit(): void {
  }
  orderLineSelected(orderline: OrderLine): void {
    console.log('Orderline is clicked', orderline)
  }
}
