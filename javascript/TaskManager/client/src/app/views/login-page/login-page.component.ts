import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/Auth.service';
import {HttpResponse} from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  constructor(
    private loginService:AuthService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  login(email:string,password:string){
    this.loginService.login(email,password).subscribe(
      (res: HttpResponse<any>) =>{
        console.log("response>>",res);
        if(res.status === 200){
          // We have successfully logged in
          this.router.navigate(['/']);
        }
      },
      err=>{

      }
    )

  }
}
