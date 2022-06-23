import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title: string = 'todoApp';
  titleMain: string = 'TODO';
  modeLight: boolean = true;
  modeDark: boolean = false;
  mode: string = 'dark';

  ngOnInit(): void {
    this.mode = localStorage.getItem('mode')!;
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
      this.mode = 'light';
      this.modeLight = true;
      this.modeDark = false;
      localStorage.setItem('mode', 'light');
    }
  }
}
