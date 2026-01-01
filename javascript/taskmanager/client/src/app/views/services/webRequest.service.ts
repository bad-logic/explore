import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class webRequestService{
    constructor(
        private http:HttpClient
    ){

    }

    getRequest(url:string,options:any){
        return this.http.get(url, options);
    }

    postRequest(url:string,payload:any,options:any){
        return this.http.post(url, payload, options);
    }

    putRequest(url:string,payload:any,options:any){
        return this.http.put(url, payload, options);
    }

    deleteRequest(url:any,options:any){
        return this.http.delete(url,options);
    }
}