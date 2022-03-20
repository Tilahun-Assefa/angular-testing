import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SalesService {

  constructor() { }
}

export interface OrderLine {
  sku: string;
  name: string;
  imageUrl: string;
  department: string[], 
  price: number, 
  quantity: number;
}