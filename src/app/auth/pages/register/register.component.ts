import { Component, DoCheck, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, DoCheck {

  mode: string = "";

  constructor() { }

  ngDoCheck(): void {
    this.mode = localStorage.getItem('mode')!;
  }

  ngOnInit(): void {
    this.mode = localStorage.getItem('mode')!;
  }
}
