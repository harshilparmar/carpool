import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from "../common/service/auth-service.service";
import { Router } from "@angular/router";
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private loginuserdata = {};
  errMess : string;
  constructor(private authService : AuthServiceService,
              private routing: Router) { }

  ngOnInit() {
  }

  submitLogin(){

    this.authService.loginUser(this.loginuserdata)
    .subscribe(
      data => {
                // console.log(data);
                localStorage.setItem('token',data.token);
                localStorage.setItem('userID',data.payload.subject);
                localStorage.setItem('isAdmin',data.payload.admin);
                if(data.payload.admin == true){
                  this.routing.navigate(['/admin']);
                }
                else{
                this.routing.navigate(['/events']);
                }
              },
      err =>{
          if(err instanceof HttpErrorResponse){
                this.errMess = err.error;
          }
      }
      );


  }
}
