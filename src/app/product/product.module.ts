import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { ProductComponent } from './product.component';
import { ProductItemComponent } from './product-item/product-item.component';
import { AngularMaterialModule } from '../angular-material/angular-material.module';
import { SharedModule } from '../shared/shared.module';

const routes: Route[] = [
  { path: '', component: ProductComponent }
];
@NgModule({
  declarations: [ProductComponent, ProductItemComponent],
  imports: [SharedModule, RouterModule.forChild(routes), AngularMaterialModule ],
  exports: [] 
})
export class ProductModule { }
