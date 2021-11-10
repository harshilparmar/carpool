import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserDetail } from '../model/user_reg';

@Injectable({
  providedIn: 'root'
})
export class UserprofileService {
  constructor(private http : HttpClient) { }
  private _userDetail = 'http://localhost:3000/api/profile';
  private _userUpdate = 'http://localhost:3000/api/proupdate';
  private _regowener = "http://localhost:3000/api/owener_reg";
  private _rideRequest = "http://localhost:3000/api/rideconfirmation";
  private _riderActive = "http://localhost:3000/api/riderActive";
  private _riderdective = "http://localhost:3000/api/riderdeactive";
  private _userRides = "http://localhost:3000/api/user_rides";
  private _rideDetail = "http://localhost:3000/api/ridedetail";
  private _oweneRides = "http://localhost:3000/api/owenerRides";
  private _loadreq = "http://localhost:3000/api/allLoadReq";
  private _loadaccept = "http://localhost:3000/api/loadaccept";
  private _loadreject = "http://localhost:3000/api/loadreject";
  // private _loadacceptreq = "http://localhost:3000/api/loadacceptreq"
  isOwener;
  isRejected;
  public secondEmail : string ;
  getProfile(id){
    // return `this._userDetail${localStorage.getItem('userID')}`
    return this.http.get(`${this._userDetail}/${id}`);
  }

  tempregister(userdata){
    return this.http.post<any>(this._regowener, userdata);
  }

  updateProfile(id,dataChange){
    return this.http.patch<any>(`${this._userUpdate}/${id}`, dataChange);
  }



  offerRideCheck(){
    let owener;
    setInterval(owener = this.tempfunction(),1500);
    // console.log('owener'+ owener);
   return !!owener;
  }

tempfunction(){
  this.http.get(`${this._userDetail}/${localStorage.getItem('userID')}`).subscribe((res : UserDetail)=>{
    this.isOwener= res.owener;
});
return this.isOwener;
}

  beingReject(){
    let result;
    setInterval(result = this.tempfun(),1500);

  return !!result;
}


tempfun(){
  this.http.get(`${this._userDetail}/${localStorage.getItem('userID')}`).subscribe((res : UserDetail)=>{
   this.isRejected = res.isRejected;
    });
return this.isRejected;
}

pandingrequest(){
  return this.http.post(this._rideRequest,{ owenerID : localStorage.getItem('userID')});
}



acceptride(obj){
  return this.http.post(this._riderActive,obj);
}


rejectRide(id){
  return this.http.delete(`${this._riderdective}/${id}`)
}


userRides(){
  return this.http.get(`${this._userRides}/${localStorage.getItem('userID')}`);
}


rideDetail(rideID){
  return this.http.get(`${this._rideDetail}/${rideID}`);
}



owenerRides(){
  return this.http.get(`${this._oweneRides}/${localStorage.getItem('userID')}`);
}

loadDetail(){
  return this.http.get<any>(`${this._loadreq}`);
}




loadacceptride(obj){
  return this.http.post(this._loadaccept,obj);  /////api
}


loadrejectRide(id){
  return this.http.delete(`${this._loadreject}/${id}`);  /////api
 }

// loadAcceptDetail(){
//   return this.http.get(`${this._userDetail}/${localStorage.getItem('userID')}`);
//   // return this.http.get<any>(`${this._loadacceptreq}/${localStorage.getItem('userID')}`);
// }

sendEmail(url, data) {

  return this.http.post(url, data);
}

}
