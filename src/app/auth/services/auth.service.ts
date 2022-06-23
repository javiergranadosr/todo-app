import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import {
  AuthReponse,
  Login,
  Register,
  tokenResponse,
} from '../interfaces/auth';

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

  validateToken(): Observable<boolean> {
    const ep = `${this.urlBase}/auth/validateToken`;
    const headers = new HttpHeaders().set(
      'x-token',
      localStorage.getItem('x-token') || ''
    );
    console.log(headers);
    console.log(localStorage.getItem('x-token'))
    return this.http.get<tokenResponse>(ep, { headers }).pipe(
      map((resp) => {
        return resp.ok;
      }),
      catchError((error) =>  {
        console.log(error);
        return of(false);
      })
    );
  }
}
