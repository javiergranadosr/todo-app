import { Component, DoCheck, OnInit } from '@angular/core';

@Component({
  selector: 'app-lists-tasks',
  templateUrl: './lists-tasks.component.html',
  styleUrls: ['./lists-tasks.component.css']
})
export class ListsTasksComponent implements OnInit, DoCheck {
  mode: string = "";
  constructor() { }

  ngDoCheck(): void {
    this.mode = localStorage.getItem('mode')!;
  }

  ngOnInit(): void {
    this.mode = localStorage.getItem('mode')!;
  }

}
