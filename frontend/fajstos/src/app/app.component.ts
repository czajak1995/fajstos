import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'fajstos';
  numbers = []

  constructor() {
    this.numbers = Array(16).fill(0).map((x,i)=>i+1);
  }

  

  public display(elem : string) {
    console.log(elem)
  }
}
