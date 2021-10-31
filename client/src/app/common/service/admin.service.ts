import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// import 'rxjs/Rx';
// import {Observable} from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private _getall = 'http://localhost:3000/api/profile';
  private _check = 'http://localhost:3000/api/varifaction';
  private _active = 'http://localhost:3000/api/active';
  private _reject = 'http://localhost:3000/api/reject';
  private _count = 'http://localhost:3000/api/documentcount';

  constructor(private http : HttpClient) { }


  allProfile(){
    return this.http.get(this._getall);
  }


  checkOut(){
    return this.http.get(this._check);
  }

  downloadFile(file:String){
    var body = {filename:file};

    return this.http.post('http://localhost:3000/api/download',body,{
        responseType : 'blob',
        headers:new HttpHeaders().append('Content-Type','application/json')
    });
}

  activeUser(userid){
    return this.http.patch(`${this._active}/${userid}`,null);

  }

  rejectUser(userid){
    return this.http.delete(`${this._reject}/${userid}`);

  }

  totalRecord(){
    return this.http.get(this._count);

  }



}
