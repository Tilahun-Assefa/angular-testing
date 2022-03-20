import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderListComponent } from './order-list/order-list.component';
import { AngularMaterialModule } from '../angular-material/angular-material.module';
import { SharedModule } from '../shared/shared.module';
import { Route, RouterModule } from '@angular/router';
import { SalesComponent } from './sales.component';
import { OrderlineRowComponent } from './order-list/orderline-row/orderline-row.component';
import { OrderlineImageComponent } from './order-list/orderline-row/orderline-image/orderline-image.component';
import { OrderlineDepartmentComponent } from './order-list/orderline-row/orderline-department/orderline-department.component';
import { PriceDisplayComponent } from './order-list/orderline-row/price-display/price-display.component';

const routes: Route[] = [
  { path: '', component: SalesComponent }
];

@NgModule({
  declarations: [SalesComponent, OrderListComponent, OrderlineRowComponent, OrderlineImageComponent, OrderlineDepartmentComponent, PriceDisplayComponent],
  imports: [SharedModule, RouterModule.forChild(routes), AngularMaterialModule]
})
export class SalesModule { }
