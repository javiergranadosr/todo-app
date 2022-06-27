import { Component, DoCheck, OnInit } from '@angular/core';
import { TasksService } from '../../services/tasks.service';
import {Task} from '../../interfaces/tasks';

import { Notify } from 'notiflix/build/notiflix-notify-aio';


@Component({
  selector: 'app-input-create',
  templateUrl: './input-create.component.html',
  styleUrls: ['./input-create.component.css']
})
export class InputCreateComponent implements OnInit, DoCheck {
  mode: string = "";
  nameTask: string ="";
  complete:boolean = false;

  constructor(private tasksService: TasksService ) { }

  ngDoCheck(): void {
    this.mode = localStorage.getItem('mode')!;
  }

  ngOnInit(): void {
    this.mode = localStorage.getItem('mode')!;
  }

  createTask() {
    if (this.nameTask.length === 0) return;
    const data: Task = {
      name: this.nameTask,
      userId: localStorage.getItem('uid')?.toString()!,
      complete: this.complete
    };
    this.tasksService.create(data).subscribe( (resp) => {
      if (resp.code === 201) {
        Notify.success(resp.message);
        this.nameTask = "";
        this.complete = false;
      }else {
        Notify.warning("Hubo un error al crear la tarea, contacte a un administrador.");
      }
    });
  }

  toggleStatus(event: any) {
    const checked = event.target.checked;
    this.complete = checked;
  }
}
