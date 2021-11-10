import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class EventService {

  private eventsUrl = "http://localhost:3000/api/event";
  private specialUrl = "http://localhost:3000/api/special";
  private commonSearch = "http://localhost:3000/api/allride";
  private search = "http://localhost:3000/api/search";
  private  ridereq = "http://localhost:3000/api/rideRequest";


  constructor(private httpClient:HttpClient) { }

  rideDetailbyid(id){
       return this.httpClient.get(`${this.eventsUrl}/${id}`);
  }


  rideList(){
    return this.httpClient.get(`${this.eventsUrl}`);
}

  offerRide(data){
    return this.httpClient.post(this.specialUrl,data);
}

  commonRideSearch(keyword){
    return this.httpClient.post(this.commonSearch,keyword);
  }

  searchRide(keyword){
    return this.httpClient.post(this.search,keyword);
  }


  bookRequest(riderId){
    return this.httpClient.post(this.ridereq,riderId);
  }



}
