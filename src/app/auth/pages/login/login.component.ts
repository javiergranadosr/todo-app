import { Component, DoCheck, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { ErrorResponse } from 'src/app/shared/response';
import { Login } from '../../interfaces/auth';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit, DoCheck {
  mode: string = '';
  errors: ErrorResponse[] = [];
  errorMessage: string = '';

  loginForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private route: Router
  ) {}

  ngDoCheck(): void {
    this.mode = localStorage.getItem('mode')!;
  }

  ngOnInit(): void {
    this.mode = localStorage.getItem('mode')!;
  }

  login(): void {
    const { email, password } = this.loginForm.value;
    const data: Login = { email, password };
    this.errors = [];
    this.errorMessage = '';

    this.authService.login(data).subscribe((resp) => {
      if (resp.code === 200) {
        this.route.navigateByUrl("/tasks");
      } else {
        if (resp.code === 400) {
          this.errorMessage = resp.message;
        }
        this.errors = resp.errors;
        console.log(this.errors);
      }
    });
  }
}
