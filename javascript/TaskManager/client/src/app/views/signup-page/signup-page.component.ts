import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/Auth.service';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.scss']
})
export class SignupPageComponent implements OnInit {

  constructor(
    private authService:AuthService
  ) { }

  ngOnInit() {
  }

  signUp(email:string,password:string){
    this.authService.signUp(email,password).subscribe(
      (res: HttpResponse<any>) => {
        console.log("response>>",res);
      },
      error=>{

      }
    )
  }
}
