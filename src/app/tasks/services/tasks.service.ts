import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

import { TaskResponse } from 'src/app/shared/response';
import { ListTasks, Task } from '../interfaces/tasks';
import { map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  private urlBase: string = environment.urlBase;

  get headers(): HttpHeaders {
    return new HttpHeaders().set(
      'x-token',
      localStorage.getItem('x-token') || ''
    );
  }

  constructor(private http: HttpClient) {}

  create(task: Task) {
    const ep: string = `${this.urlBase}/tasks`;
    return this.http
      .post<TaskResponse>(ep, task, { headers: this.headers })
      .pipe(
        map((resp) => {
          return resp;
        }),
        catchError((error) => {
          console.log(error);
          return of(error);
        })
      );
  }

  /**
   * Listado de tareas
   * @param userId Id del usuario
   * @param complete Estatus de la tarea
   * @param limit Limite del listado de tareas
   * @param from Inicio de paginacion
   * @returns
   */
  getTasks(userId: string, complete: number, limit: number, from: number) {
    const ep: string = `${this.urlBase}/tasks?userId=${userId}&complete=${complete}&limit=${limit}&from=${from}`;
    return this.http.get<ListTasks>(ep, { headers: this.headers }).pipe(
      map((resp) => {
        return resp;
      })
    );
  }

  deleteTask(id: string) {
    const ep: string = `${this.urlBase}/tasks/${id}`;
    return this.http.delete<TaskResponse>(ep, { headers: this.headers });
  }

  /**
   * Limpia tareas completadas
   * @param id
   * @returns
   */
  clearTasks(id: string) {
    const ep: string = `${this.urlBase}/tasks/${id}`;
    return this.http.put<TaskResponse>(ep, {}, { headers: this.headers });
  }
}
