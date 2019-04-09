import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  private _registerUrl= "http://localhost:3000/api/register";
  private _loginUrl = "http://localhost:3000/api/login";


  constructor(private http:HttpClient) { }

  registeruser(userdata)
  {
    return this.http.post<any>(this._registerUrl, userdata);
  }

  loginUser(loginData)
  {
   return this.http.post<any>(this._loginUrl, loginData);
  }

  loggedIn()
  {
    return !!localStorage.getItem('token'); //convert in boolean
  }

  loggedOut(){
    localStorage.clear();
  }



}
