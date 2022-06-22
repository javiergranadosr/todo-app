import { Component, OnInit} from '@angular/core';

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
  mode: string = "dark";

  ngOnInit(): void {
    this.mode = localStorage.getItem('mode')!;
  }

  changeMode(mode: string) {
    if (mode === 'D') {
      this.modeDark = false;
      this.modeLight = true;
      this.mode = "dark";
      localStorage.setItem('mode', "dark");
    } else if (mode === 'L') {
      this.modeLight = false;
      this.modeDark = true;
      this.mode = "light";
      localStorage.setItem('mode', "light");
    } else {
      this.modeDark = false;
      this.modeLight = true;
      this.mode = "light";
      localStorage.setItem('mode', "light");
    }
  }
}
