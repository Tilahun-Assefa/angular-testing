import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'dl-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  Roles: any = ['Admin', 'Author', 'Reader'];

  constructor() { }

  ngOnInit(): void {
  }

}
