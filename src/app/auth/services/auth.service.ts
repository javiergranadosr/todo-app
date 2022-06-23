import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { catchError, map, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { AuthReponse, Login, Register } from '../interfaces/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private urlBase: string = environment.urlBase;

  constructor(private http: HttpClient) {}

  login(data: Login) {
    const ep: string = `${this.urlBase}/auth/login`;
    return this.http.post<AuthReponse>(ep, data).pipe(
      tap((resp) => {
        if (resp.code === 200) {
          localStorage.setItem('x-token', resp.token);
        }
      }),
      catchError((error) => of(error.error))
    );
  }

  register(data: Register) {
    const ep: string = `${this.urlBase}/users`;
    return this.http.post<AuthReponse>(ep, data).pipe(
      map((resp) => resp),
      catchError((error) => of(error.error))
    );
  }
}
