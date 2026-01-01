import { Component, OnInit } from '@angular/core';
import { TaskService } from '../services/task.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Task } from '../models/task.model';

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.scss']
})
export class NewTaskComponent implements OnInit {
  
  listId: string;

  constructor(
    private taskService:TaskService,
    private router:Router,
    private route:ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.params.subscribe((params:Params)=>{
      this.listId = params.listId
  });
}

  goBack(){
    this.router.navigate(['/root/',this.listId]);
  }
  
  createNewTask(title:string){
    this.taskService.createTask({title:title,_listid:this.listId}).subscribe(
      (newTask:any)=>{
        this.goBack();
      },
      error=>{

      }
    )
  }

}
