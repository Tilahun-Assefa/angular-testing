import { NgModule } from '@angular/core';
import { HomeComponent } from './home.component';
import { Route, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AngularMaterialModule } from '../angular-material/angular-material.module';
import { SharedModule } from '../shared/shared.module';

const routes: Route[] = [
  { path: '', component: HomeComponent }
];

@NgModule({
  declarations: [HomeComponent],
  imports: [SharedModule, RouterModule.forChild(routes), AngularMaterialModule],
  exports: []
})
export class HomeModule { }
