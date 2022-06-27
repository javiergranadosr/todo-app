import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

import { TaskResponse } from 'src/app/shared/response';
import { Task } from '../interfaces/tasks';
import { map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  private urlBase: string = environment.urlBase;

  constructor(private http: HttpClient) {}

  create(task: Task) {
    const ep: string = `${this.urlBase}/tasks`;
    const headers = new HttpHeaders().set(
      'x-token',
      localStorage.getItem('x-token') || ''
    );
    return this.http.post<TaskResponse>(ep, task, { headers }).pipe(
      map((resp) => {
        return resp;
      }),
      catchError((error) => {
        console.log(error);
        return of(error);
      })
    );
  }
}
