import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoadService {

  constructor(private http : HttpClient) { }

  private _loadreg = 'http://localhost:3000/api/loadreg';
  // private _userUpdate = 'http://localhost:3000/api/proupdate';

  loadregister(userdata){
    return this.http.post<any>(this._loadreg, userdata);
  }


}
