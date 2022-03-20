import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { OrderLine } from 'src/app/sales/sales.service';

@Component({
  selector: 'dl-orderline-image',
  templateUrl: './orderline-image.component.html',
  styleUrls: ['./orderline-image.component.css']
})
export class OrderlineImageComponent implements OnInit {

  @Input() orderline: OrderLine;
  @HostBinding('attr.class') cssClass= 'image';

  constructor() { }

  ngOnInit(): void {
  }

}
