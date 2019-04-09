import { Component, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { environment } from 'src/environments/environment';
import { ActivatedRoute } from '@angular/router';
import { UserprofileService } from '../common/service/userprofile.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  map: mapboxgl.Map;


  style = 'mapbox://styles/mapbox/outdoors-v9';
  lat = 37.75;
  lng = -122.41;



  constructor(private http : UserprofileService) { }

  ngOnInit() {
    this.initializeMap();
    setInterval(() => {
    this.initializeMap();
  },50000);

  // console.log(this.userService.secondEmail);
     // this.initializeMap();
  }
  private initializeMap() {
    /// locate the user
    if (navigator.geolocation) {
       navigator.geolocation.getCurrentPosition(position => {
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
        this.map.flyTo({
          center: [this.lng, this.lat]
        });
        new mapboxgl.Marker()
            .setLngLat([this.lng, this.lat])
            .addTo(this.map);
      });
    }

    this.buildMap();

  }

  buildMap() {
    mapboxgl.accessToken = environment.map_api;
    this.map = new mapboxgl.Map({
      container: 'map',
      style: this.style,
      zoom: 13,
      center: [this.lng, this.lat]
    });

}

sendmail(){
  let user = {
    name: 'http://localhost:4200/currentlocation',
    email: 'dhruvam.150410107115@gmail.com' //this.userService.secondEmail
  }
  this.http.sendEmail("http://localhost:3000/api/sendmail", user).subscribe(
    data => {
      let res:any = data;
      console.log(
        `👏 > 👏 > 👏 > 👏 is successfully register and mail has been sent and the message id is `
      );
    },
    err => {
      console.log(err);

    }
  );

}

}