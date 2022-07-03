import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';



import { MainComponent } from './main/main.component';
import { ListsTasksComponent } from './components/lists-tasks/lists-tasks.component';
import { TasksRoutingModule } from './tasks-routing.module';



@NgModule({
  declarations: [
    MainComponent,
    ListsTasksComponent,
  ],
  imports: [
    CommonModule,
    TasksRoutingModule,
    FormsModule
  ]
})
export class TasksModule { }
