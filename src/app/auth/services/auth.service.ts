import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { catchError, tap } from 'rxjs/operators';
import { AuthReponse, Login } from '../interfaces/auth';
import { of } from 'rxjs';

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
}
