import { Component, DoCheck, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ErrorResponse } from 'src/app/shared/response';
import { Register } from '../../interfaces/auth';
import { AuthService } from '../../services/auth.service';

import { Notify } from 'notiflix/build/notiflix-notify-aio';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit, DoCheck {
  mode: string = '';
  errors: ErrorResponse[] = [];
  errorMessage: string = '';
  registerForm: FormGroup = this.fb.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
  });

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngDoCheck(): void {
    this.mode = localStorage.getItem('mode')!;
  }

  ngOnInit(): void {
    this.mode = localStorage.getItem('mode')!;
    this.authService.validateToken().subscribe((resp) => {
      if (resp) {
        this.router.navigateByUrl('tasks');
      }
    });
  }

  register() {
    const { name, email, password, confirmPassword } = this.registerForm.value;
    const data: Register = { name, email, password };
    this.errorMessage = '';
    this.errors = [];

    if (this.registerForm.valid) {
      if (password !== confirmPassword) {
        this.errorMessage =
          'Las contraseñas no son iguales, intente de nuevo en confirmar contraseña.';
        return;
      }

      this.authService.register(data).subscribe((resp) => {
        if (resp.code === 201) {
          Notify.info(resp.message);
          this.registerForm.reset();
          this.router.navigateByUrl('/auth');
        } else {
          this.errors = resp.errors;
          console.log(this.errors);
        }
      });
    }
  }
}
