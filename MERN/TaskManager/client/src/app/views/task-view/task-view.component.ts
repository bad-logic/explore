import { Component, OnInit } from '@angular/core';
import { TaskService } from '../services/task.service';
import { ListService } from '../services/list.service';
import { ActivatedRoute,Params, Router } from '@angular/router';
import { List } from '../models/list.model';
import { Task } from '../models/task.model';
import { AuthService } from '../services/Auth.service';

@Component({
  selector: 'app-task-view',
  templateUrl: './task-view.component.html',
  styleUrls: ['./task-view.component.scss']
})
export class TaskViewComponent implements OnInit {

  listId:string;
  taskArray: Task[];
  listArray: List[];

  selectedListId: string;
  selectedTaskId: string;
  constructor(
    private taskService:TaskService,
    private listService:ListService,
    private authService:AuthService,
    private route: ActivatedRoute,
    private router:Router
  ) { }

  ngOnInit() {
    // console.log("listId>>>",this.route.params['value']['listId']);
    this.route.params.subscribe((params:Params)=>{
      this.listId = params.listId;
      // console.log("params",this.listId);
      // if params.listId is undefined then the taskArray becomes undefined so restricting
      // the get request while listId isundefined
      // this happens in route /root and it has no listId provided in the params
      if(this.listId){
        this.selectedListId = this.listId;
        this.taskService.getTask(this.listId).subscribe(
          (tasks:any)=>{
            this.taskArray = tasks;
            // console.log("taskArray>>>",this.taskArray);
          }
        )
      }
    })
    this.listService.getLists().subscribe((data:any)=>{
      this.listArray = data;
    },
    error=>{

    })
  }
  onDeleteList(){
    this.listService.deleteList(this.selectedListId).subscribe(
      done=>{
        this.router.navigate(['/root']);
      },
      error=>{
        
      }
    )

  }
  onDeleteTask(id){
    console.log("id>>",id);
    console.log("lsit id>>",this.selectedListId);
    this.taskService.deleteTask(this.selectedListId,id).subscribe(
      (succ)=>{
        console.log("successfully deleted the task");
        this.taskArray = this.taskArray.filter(val=> val._id !== id);
        console.log("taskArray>>",this.taskArray);
      },
      (error)=>{
        console.log("error>>",error);
      }
    )
  }

  onTaskClick(data:Task){
    data.completed = !data.completed;
    console.log("task to be updated>>>",data);
    console.log("list>>",this.selectedListId);
    this.taskService.editTask(data._id,data).subscribe(
      done=>{
        console.log("successfully updated the task completed value");
      },
      error=>{

      }
    );
  }
  logout(){
    console.log("logged out signin");
    this.authService.logout();
  }

}
