import {Injectable} from '@angular/core';
import {HttpInterceptor, HttpErrorResponse, HttpHandler, HttpRequest} from '@angular/common/http';
import {Observable, throwError, empty, Subject} from 'rxjs';
import {catchError, tap, switchMap} from 'rxjs/operators';
import { AuthService } from './Auth.service';

// Purpose: to intercept the web request to the api and add access token to it
@Injectable()
export class webRequestInterceptor implements HttpInterceptor{
    
    constructor(private loginService: AuthService){
    }

    // avoid looping the refreshAccessToken method when the refreshToken expires
    refreshingAccessToken:boolean;

    accessTokenRefreshed : Subject<any> = new Subject();

    intercept(request: HttpRequest<any>, next:HttpHandler):Observable<any>{

        //Handle the request
        request = this.addAuthHeader(request);

        // call next() and handle response
        return next.handle(request).pipe(
            catchError((error:HttpErrorResponse)=>{
                console.log("error>>",error);
                if(error.status === 401){
                    //401 error so we are unauthorized

                    // refresh the access token 
                    return this.refreshAccessToken()
                    .pipe(
                        switchMap(()=>{
                            request = this.addAuthHeader(request);
                            return next.handle(request);
                        }),
                        catchError((error:any)=>{
                            console.log("error>>",error);
                            this.loginService.logout();
                            return empty();//returning empty observable
                        })
                    );
                }
                return throwError(error)
            })
        );
    }
    // this method adds the access token to the request object
    addAuthHeader(request: HttpRequest<any>){
        //get the access token 
        const token = this.loginService.getAccessToken();
        //append the access token to the request header
        if(token){
            return request.clone({
                setHeaders:{
                    'x-access-token':token
                }
            })
        }
        return request;
    }

    refreshAccessToken(){
        if(this.refreshingAccessToken){
            return new Observable(observer=>{
                this.accessTokenRefreshed.subscribe(()=>{
                    //this code will run when the access token has been refreshed
                    observer.next();
                    observer.complete();
                })
            })
        }else{
            this.refreshingAccessToken = true;
            // call the method in login service to send a request to send a request to get access token
            return this.loginService.getNewAccessToken().pipe(
                tap(()=>{//just observe the response
                    this.refreshingAccessToken = false;
                    console.log("access-token refreshed");
                    this.accessTokenRefreshed.next();
                })
            )
        }
    }

}