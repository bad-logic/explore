import { Injectable } from '@angular/core';
import { BaseService } from './../../services/base.service';
import { Task } from '../models/task.model';
import { webRequestService } from './webRequest.service';

@Injectable()
export class TaskService extends BaseService{
    constructor(
        private request:webRequestService
    ){
        super('task');
    }

    getTask(listId:string){
        return this.request.getRequest(this.url+listId+'/',this.getOptions());
    }
    
    getTaskById(listId:string,taskId:string){
        return this.request.getRequest(this.url+listId+'/'+taskId+'/',this.getOptions());
    }

    createTask(payload:Task){
        return this.request.postRequest(this.url+payload._listid+'/',payload,this.getOptions());
    }

    editTask(taskId:string,payload:Task){
        return this.request.putRequest(this.url+payload._listid+'/'+taskId+'/',payload,this.getOptions());
    }

    deleteTask(listId:string,taskId:string){
        return this.request.deleteRequest(this.url+listId+'/'+taskId+'/',this.getOptions());
    }


}