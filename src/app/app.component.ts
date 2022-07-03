import { Component, DoCheck, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})

export class AppComponent implements OnInit, DoCheck {
  title: string = 'todoApp';
  titleMain: string = 'TODO';
  modeLight: boolean = true;
  modeDark: boolean = false;
  mode: string = 'dark';
  token: string | undefined = undefined;

  constructor(private router: Router) {}

  ngDoCheck(): void {
    this.token = localStorage.getItem('x-token')!;
  }

  ngOnInit(): void {
    this.mode = localStorage.getItem('mode')!;
    this.token = localStorage.getItem('x-token')!;
    this.changeMode(this.mode);
  }

  changeMode(mode: string) {
    if (mode === 'dark') {
      this.mode = 'dark';
      this.modeLight = true;
      this.modeDark = false;
      localStorage.setItem('mode', 'dark');
    } else if (mode === 'light') {
      this.mode = 'light';
      this.modeLight = false;
      this.modeDark = true;
      localStorage.setItem('mode', 'light');
    } else {
      this.mode = 'dark';
      this.modeLight = true;
      this.modeDark = false;
      localStorage.setItem('mode', 'dark');
    }
  }

  signOff() {
    localStorage.clear();
    this.router.navigateByUrl('/auth');

  }
}
