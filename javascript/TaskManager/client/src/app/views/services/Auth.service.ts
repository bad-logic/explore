import {Injectable} from '@angular/core';
import {webRequestService} from './webRequest.service';
import {Router} from '@angular/router';
import { BaseService } from 'src/app/services/base.service';
import {HttpResponse} from '@angular/common/http';
import {shareReplay, tap} from 'rxjs/operators';


@Injectable()
export class AuthService extends BaseService{
    constructor(
        private request:webRequestService,
        private router:Router
    ){
        super('user');
    }

    login(email:string,password:string){
        // this.request.postRequest(this.url+'/login',{email,password},this.getOptions());
        return this.request.postRequest(this.url+'login',{email,password},{
            observe: 'response'
        })
        .pipe(
            // stop multiple subscribers starting multiple execution of this method
            //  here stoping the execution of login method multiple times
            shareReplay(),
            tap(
                // (res:HttpResponse<any>) => { // solve error aauxa monotype not compatible with array buffer
                (res:any) => {
                // the auth token will be in the header of this response
                this.setSession(res.body._id,res.headers.get('x-access-token'),res.headers.get('x-refresh-token'));
                }
            )
        )
    }

    logout(){
        this.removeSession();
        this.router.navigate(['/login']);
    }

    signUp(email:string,password:string){
        return this.request.postRequest(this.url,{email,password},{
            observe: 'response'
        }).pipe(
            shareReplay(),
            tap(
                // (res: HttpResponse<any>)=>{
                (res:any)=>{
                this.setSession(res.body._id,res.headers.get('x-access-token'),res.headers.get('x-refresh-token'));
                console.log("successfully signed up and now logged In!!!");
                }
            )
        );
    }

    private setSession(userId:string, accessToken: string, refreshToken:string){
        localStorage.setItem('user-id',userId);
        localStorage.setItem('x-access-token', accessToken);
        localStorage.setItem('x-refresh-token', refreshToken);
    }
    getAccessToken(){
        return localStorage.getItem('x-access-token');
    }
    getRefreshToken(){
        return localStorage.getItem('x-refresh-token');
    }
    getUserId(){
        return localStorage.getItem('user-id');
    }
    setAccessToken(accessToken:string){
        localStorage.setItem('x-access-token',accessToken);
    }

    private removeSession(){
        localStorage.removeItem('user-id');
        localStorage.removeItem('x-access-token');
        localStorage.removeItem('x-refresh-token');
    }

    getNewAccessToken(){
        return this.request.getRequest(this.url+'valid/access-token',{
            headers:{
                'x-refresh-token': this.getRefreshToken(),
                '_id': this.getUserId()
            },
            observe: 'response'
        }).pipe(
            tap(
                // (res:HttpResponse<any>)=>{
                (res:any)=>{
                this.setAccessToken(res.headers.get('x-access-token'));
            })
        );
    }
   
}