import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Route, RouterModule } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { AngularMaterialModule } from '../angular-material/angular-material.module';

const routes: Route[] = [
  { path: '', component: LoginComponent },
  { path: 'register', component: RegisterComponent }
];

@NgModule({
  declarations: [LoginComponent, RegisterComponent],
  imports: [
    CommonModule, ReactiveFormsModule,
    FormsModule, RouterModule.forChild(routes), AngularMaterialModule
  ]
})
export class LoginModule { }
