import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { OrderLine } from '../../sales.service';

@Component({
  selector: 'dl-orderline-row',
  templateUrl: './orderline-row.component.html',
  styleUrls: ['./orderline-row.component.css']
})
export class OrderlineRowComponent implements OnInit {

  @Input() orderline: OrderLine;
  @HostBinding('attr.class') cssClass = "orderline";
  constructor() { }

  ngOnInit(): void {
  }

}
