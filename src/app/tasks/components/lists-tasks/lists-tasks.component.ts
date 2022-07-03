import { AfterContentChecked, Component, DoCheck, OnInit } from '@angular/core';
import { TasksService } from '../../services/tasks.service';
import { Tasks, Task } from '../../interfaces/tasks';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

@Component({
  selector: 'app-lists-tasks',
  templateUrl: './lists-tasks.component.html',
  styleUrls: ['./lists-tasks.component.css'],
})
export class ListsTasksComponent implements OnInit, DoCheck {
  nameTask: string = '';
  complete: boolean = false;

  mode: string = '';
  tasks: Tasks[] = [];
  total: number = 0;
  typeFilter: string = 'all';

  constructor(private tasksService: TasksService) {}

  ngDoCheck(): void {
    this.mode = localStorage.getItem('mode')!;
  }

  ngOnInit(): void {
    this.mode = localStorage.getItem('mode')!;
    this.getTasks();
  }

  createTask() {
    if (this.nameTask.length === 0) return;
    const data: Task = {
      name: this.nameTask,
      userId: localStorage.getItem('uid')?.toString()!,
      complete: this.complete,
    };
    this.tasksService.create(data).subscribe((resp) => {
      if (resp.code === 201) {
        Notify.success(resp.message);
        this.nameTask = '';
        this.complete = false;
        this.getTasks();
      } else {
        Notify.warning(
          'Hubo un error al crear la tarea, contacte a un administrador.'
        );
      }
    });
  }

  toggleStatus(event: any) {
    const checked = event.target.checked;
    this.complete = checked;
  }

  configureListTasks(complete: number = -1) {
    const userId: string = localStorage.getItem('uid')!;
    const limit: number = 10;
    const from: number = 0;

    switch (complete) {
      case -1:
        this.typeFilter = 'all';
        break;
      case 0:
        this.typeFilter = 'active';
        break;
      case 1:
        this.typeFilter = 'completed';
        break;
      default:
        this.typeFilter = 'all';
        break;
    }

    this.tasksService
      .getTasks(userId, complete, limit, from)
      .subscribe(({ total, code, tasks }) => {
        if (code === 200) {
          this.tasks = tasks;
          this.total = tasks.length;
        } else {
          this.total = 0;
          this.tasks = [];
        }
      });
  }

  getTasks() {
    switch (this.typeFilter) {
      case 'all':
        this.configureListTasks(-1);
        break;
      case 'active':
        this.configureListTasks(0);
        break;
      case 'completed':
        this.configureListTasks(1);
        break;
      default:
        this.configureListTasks(-1);
        break;
    }
  }

  deleteTask(id: string) {
    this.tasksService.deleteTask(id).subscribe((resp) => {
      if (resp.code === 200) {
        Notify.success(resp.message);
        this.getTasks();
      } else {
        Notify.warning(resp.message);
      }
    });
  }

  clearTasks() {
    const userId: string = localStorage.getItem('uid')
      ? localStorage.getItem('uid')!
      : '';
    this.tasksService.clearTasks(userId).subscribe((resp) => {
      if (resp.code === 200) {
        Notify.success(resp.message);
        this.getTasks();
      } else {
        Notify.warning(resp.message);
      }
    });
  }
}
