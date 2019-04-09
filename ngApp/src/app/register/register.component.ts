import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from "../common/service/auth-service.service";
import { Router } from "@angular/router";
import {  Validators, NgForm, FormBuilder } from '@angular/forms';
import { UserDetail } from "../common/model/user_reg";
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registeruserdata = {};
  constructor(private authservice : AuthServiceService,
              private routing: Router,
              private fb: FormBuilder ) { }

  ngOnInit() {
  }

  reg_form = this.fb.group({
    first_name: [null,Validators.required],
    last_name : [null,Validators.required],
    userid : [null,[Validators.required, Validators.minLength(5)]],
    password:[null,Validators.required],
    email:[null,[Validators.required,Validators.email]],
    second_email:[null,[Validators.required,Validators.email]],
    phone:[null,[Validators.required,Validators.minLength(10)]],
    gender:[null,Validators.required],

  });

  onFormSubmit(form: UserDetail)
  {

      console.log(form);
      this.authservice.registeruser(form)
      .subscribe(
           res => {
                    // console.log(res.payload.admin);
                    localStorage.setItem('token',res.token);
                    localStorage.setItem('userID',res.payload.subject);

                    this.routing.navigate(['/beOwener']);

           },
          err => console.log(err)

      );

  }






}
