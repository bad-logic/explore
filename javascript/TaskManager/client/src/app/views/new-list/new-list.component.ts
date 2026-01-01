import { Component, OnInit } from '@angular/core';
import { List } from '../models/list.model';
import { ListService } from '../services/list.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-list',
  templateUrl: './new-list.component.html',
  styleUrls: ['./new-list.component.scss']
})
export class NewListComponent implements OnInit {
  newlist;
  constructor(
    private listService : ListService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  createNewList(title:string){
    this.listService.createList({title:title}).subscribe(
      (newList: any) => {
        console.log("newList>>>",newList);
        this.router.navigate(['/root/',newList._id]);
      },
      error=>{

      }
    )
  }
  

}
