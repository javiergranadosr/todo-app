import { Component, DoCheck, OnInit } from '@angular/core';
import { TasksService } from '../../services/tasks.service';
import { Tasks, Task, ChangeComplete } from '../../interfaces/tasks';
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

  limit: number = 5;
  from: number = 0;
  currentPage: number = 1;
  totalPages: number = 0;

  constructor(private tasksService: TasksService) {}

  ngDoCheck(): void {
    this.mode = localStorage.getItem('mode')!;
  }

  ngOnInit(): void {
    this.mode = localStorage.getItem('mode')!;
    this.getTasks(true);
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
        this.getTasks(false);
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

  configureListTasks(complete: number = -1, resetPagination: boolean) {
    const userId: string = localStorage.getItem('uid')!;

    if (resetPagination) {
      this.currentPage = 1;
      this.from = 0;
    }

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
      .getTasks(userId, complete, this.limit, this.from)
      .subscribe(({ total, code, tasks }) => {
        if (code === 200) {
          this.tasks = tasks;
          this.total = total;
          this.totalPages = Math.ceil(this.total / this.limit);
        }
      });
  }

  getTasks(resetPagination: boolean) {
    switch (this.typeFilter) {
      case 'all':
        this.configureListTasks(-1, resetPagination);
        break;
      case 'active':
        this.configureListTasks(0, resetPagination);
        break;
      case 'completed':
        this.configureListTasks(1, resetPagination);
        break;
      default:
        this.configureListTasks(-1, resetPagination);
        break;
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.from -= this.limit;
      this.getTasks(false);
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.from += this.limit;
      this.getTasks(false);
    }
  }

  deleteTask(id: string) {
    this.tasksService.deleteTask(id).subscribe((resp) => {
      if (resp.code === 200) {
        Notify.success(resp.message);
        this.getTasks(true);
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
        this.typeFilter = "all";
        this.getTasks(true);
      } else {
        Notify.warning(resp.message);
      }
    });
  }

  changeComplete(event: any, taskId: string) {
    const checked = event.target.checked;
    const data: ChangeComplete = { id: taskId, complete: checked };
    this.tasksService.changeComplete(data).subscribe((resp) => {
      if (resp.code === 200) {
        Notify.success(resp.message);
        this.getTasks(false);
      } else {
        Notify.warning(resp.message);
      }
    });
  }
}
