import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ListService } from '../services/list.service';

@Component({
  selector: 'app-edit-list',
  templateUrl: './edit-list.component.html',
  styleUrls: ['./edit-list.component.scss']
})
export class EditListComponent implements OnInit {

  constructor(
    private route:ActivatedRoute,
    private listService:ListService,
    private router: Router
  ) { }

  listId:string;
  listTitle: string;
  ngOnInit() {
    this.route.params.subscribe((params:Params)=>{
      if(params.listId){
        this.listId = params.listId;
        this.listService.getListById(this.listId).subscribe(
          (res:any)=>{
            console.log("Response>>>",res);
            console.log("title>>>",res[0].title);
            this.listTitle = res[0].title
          },
          (err)=>{
            console.log("error>>>",err);
          })
      }
    })
    
  }

  updateList(){
    console.log("updated list title>>",this.listTitle);
    this.listService.editList(this.listId,{title:this.listTitle}).subscribe(
      (res:any)=>{
        console.log("successfully updated the list");
        this.router.navigate(['/root']);
      },
      error=>{
        console.log("error>>",error);
      }
    )

  }
}
