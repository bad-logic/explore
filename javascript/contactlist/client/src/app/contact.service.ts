import { Injectable } from '@angular/core';
import {Contacts} from './contact.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {environment} from './../environments/environment';



@Injectable()
export class ContactService {

  constructor(
    private http: HttpClient
  ) { }

  getOptions(){
    return {
      headers: new HttpHeaders({
      'content-Type':'application/json'
      })
  }
  }

  getContact(id){
    return this.http.get(environment.BaseUrl+'contact/'+id,this.getOptions());
  }
  getContacts(){
    return this.http.get(environment.BaseUrl+'contact',this.getOptions());
  }
  
  addContact(newContact:Contacts){
    return this.http.post(environment.BaseUrl+'contact',newContact,this.getOptions());
  }
  
  deleteContact(id){
    return this.http.delete(environment.BaseUrl+'contact/'+id,this.getOptions());
  }

  updateContact(id,data){
    return this.http.put(environment.BaseUrl+'contact/'+id,data,this.getOptions());
  }
 
}
