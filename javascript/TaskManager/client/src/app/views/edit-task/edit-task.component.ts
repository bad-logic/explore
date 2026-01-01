import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { TaskService } from '../services/task.service';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.scss']
})
export class EditTaskComponent implements OnInit {

  constructor(
    private route:ActivatedRoute,
    private router:Router,
    private taskService: TaskService
  ) { }
  title: string;
  listId:string;
  taskId:string;
  ngOnInit() {
    this.route.params.subscribe((parameter:Params)=>{
      // console.log("parameters>>>",parameter);
      if(parameter.listId && parameter.taskId){
        this.listId = parameter.listId;
        this.taskId = parameter.taskId;
        // console.log("ids got are>>", this.listId, this.taskId);
        this.taskService.getTaskById(this.listId,this.taskId).subscribe(
          response=>{
            // console.log("response>>",response[0].title);
            this.title = response[0].title;
          },
          error=>{
            console.log("error>>>",error);
          }
        )
      }
    })
  }
  goBack(){
    this.router.navigate(['/root/',this.listId]);
  }
  updateTask(){
    console.log("updated title>>",this.title);
    this.taskService.editTask(this.taskId,{title:this.title,_listid:this.listId})
      .subscribe(
        done=>{
          console.log("successfully updated");
          this.goBack();
        },
        error=>{
          console.log("error>>",error);
        }
      )
  }
  

}
