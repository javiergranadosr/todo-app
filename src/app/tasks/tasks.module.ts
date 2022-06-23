import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainComponent } from './main/main.component';
import { InputCreateComponent } from './components/input-create/input-create.component';
import { ListsTasksComponent } from './components/lists-tasks/lists-tasks.component';
import { TasksRoutingModule } from './tasks-routing.module';



@NgModule({
  declarations: [
    MainComponent,
    InputCreateComponent,
    ListsTasksComponent
  ],
  imports: [
    CommonModule,
    TasksRoutingModule
  ]
})
export class TasksModule { }