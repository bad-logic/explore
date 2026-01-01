import { Injectable } from '@angular/core';
import { BaseService } from './../../services/base.service';
import {List} from './../models/list.model';
import { webRequestService } from './webRequest.service';

@Injectable()
export class ListService extends BaseService{
    constructor(
        private request: webRequestService
    ){
        super('list');
    }

    getLists(){
        return this.request.getRequest(this.url,this.getOptions());
    }
    getListById(listId:string){
        return this.request.getRequest(this.url+listId+'/',this.getOptions());
    }

    createList(payload:List){
        return this.request.postRequest(this.url,payload,this.getOptions());
    }

    editList(listId:string,payload:List){
        return this.request.putRequest(this.url+listId+'/',payload,this.getOptions());
    }

    deleteList(listId:string){
        return this.request.deleteRequest(this.url+listId+'/',this.getOptions());
    }

}

