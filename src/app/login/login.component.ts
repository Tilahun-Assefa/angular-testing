import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgModel, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Component({
  selector: 'dl-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading: boolean = false;
  submitted: boolean = false;
  returnUrl: string;
  errorMessage: string = '';

  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute,
    private router: Router, private authService: AuthService) {
    if (this.authService.userValue) {
      //if the user authenticated go to homepage
      this.router.navigate(['/']);
    }
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
    //set return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  get f() {
    return this.loginForm.controls;
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      this.errorMessage = "Incorrect Credential";
      setTimeout(function () {
        this.errorMessage = '';
      }.bind(this), 2500);
      return;
    }
    this.submitted = true;
    this.loading = true;
    this.authService.login(this.f.username.value, this.f.password.value)
      .subscribe(
        {
          next: (data) => { this.router.navigate([this.returnUrl]); },
          error: (error) => {
            this.errorMessage = error;
            this.loading = false;
          },
          complete: () => console.info('complete')
        });
  }

  onBlur(f) {
    alert(f.value);
  }
}
