import { Component, Input, OnInit } from '@angular/core';
import { OrderLine } from 'src/app/sales/sales.service';

@Component({
  selector: 'dl-orderline-department',
  templateUrl: './orderline-department.component.html',
  styleUrls: ['./orderline-department.component.css']
})
export class OrderlineDepartmentComponent implements OnInit {

  @Input() orderline:OrderLine;

  constructor() { }

  ngOnInit(): void {
  }

}
