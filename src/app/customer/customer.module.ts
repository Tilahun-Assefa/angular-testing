import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { AngularMaterialModule } from '../angular-material/angular-material.module';
import { SharedModule } from '../shared/shared.module';
import { CustomerComponent } from './customer.component';
import { CustomerListComponent } from './customer-list/customer-list.component';

const routes: Route[] = [
  { path: '', component: CustomerComponent }
];

@NgModule({
  declarations: [CustomerComponent, CustomerListComponent],
  imports: [
    SharedModule, RouterModule.forChild(routes), AngularMaterialModule
  ],
  exports: [CustomerComponent]
})
export class CustomerModule { }
