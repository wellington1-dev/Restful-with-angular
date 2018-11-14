import { Component, OnInit } from '@angular/core';
import { HttpService } from './http.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'Mean Stack';
  tasks: any = [];
  constructor(private _httpService : HttpService){
  }
  ngOnInit(){
    this.getTasks();
    // this.onClickDelete(id);
  }
  
    
  

  getTasks(){
    let observable = this._httpService.getTasks();
    observable.subscribe(data => {
      console.log("Got our tasks!", data)
      this.tasks = data;
    });
  }
  onClickDelete(id){
    let observable = this._httpService.deleteTasks(id);
    observable.subscribe(data => {
      console.log("Deleted our Task!", data)
      this.onClickDelete = id;
    });
  }

}
