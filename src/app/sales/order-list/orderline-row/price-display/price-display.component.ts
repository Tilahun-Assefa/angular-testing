import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'dl-price-display',
  templateUrl: './price-display.component.html',
  styleUrls: ['./price-display.component.css']
})
export class PriceDisplayComponent implements OnInit {

  @Input() price: number;

  constructor() { }

  ngOnInit(): void {
  }

}
