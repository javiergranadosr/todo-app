import { Component, DoCheck, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit, DoCheck {
  mode: string = "";

  constructor() { }

  ngDoCheck(): void {
    this.mode = localStorage.getItem('mode')!;
  }

  ngOnInit(): void {
    this.mode = localStorage.getItem('mode')!;
  }

}
