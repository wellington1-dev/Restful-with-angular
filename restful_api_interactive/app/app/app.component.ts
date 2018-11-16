import { Component, OnInit } from '@angular/core';
import { HttpService } from './http.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Restful Tasks API';
  tasks: any = [];
  task: any = [];
  constructor(private _httpService: HttpService) {

  }
  ngOnInit() {

  }

  getTasks() {

    const observable = this._httpService.getTasks();
    observable.subscribe(data => {
      console.log('Got our tasks!', data);
      this.tasks = data;
    });
  }
  onClick() {
    this.getTasks();
  }
}
