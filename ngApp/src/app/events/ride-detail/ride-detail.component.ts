import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService } from 'src/app/common/service/event.service';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-ride-detail',
  templateUrl: './ride-detail.component.html',
  styleUrls: ['./ride-detail.component.css']
})
export class RideDetailComponent implements OnInit {
  userid;
  rideDetail = {};
   now : Date = new Date();
  today: string = this.now.toISOString();



  constructor(private activeRoute : ActivatedRoute,
              private rideservice  : EventService,
              private router : Router,
              private snackBar: MatSnackBar) { }

  ngOnInit() {

    this.activeRoute.params.subscribe((params)=>{
      this.userid = params['id'];
    });
    this.rideservice.rideDetailbyid(this.userid)
      .subscribe(
        data => {
        this.rideDetail = data;
        // this.departureDate = data.departure_date;
        },
        err => console.log(err)
      );

      // console.log(this.departureDate);

}


  bookRide(owenerId,rideId) {
    // console.log(owenerID);
    // userid:schema.Types.Mixed
    let req = { userid : localStorage.getItem('userID'),
                owenerId : owenerId,
                rideid : rideId };
    this.rideservice.bookRequest(req)
    .subscribe(
      data => console.log(data),
      err => console.log(err)
    );

    this.snackBar.open('Booking is Done!','OK', {
      duration: 1500,
    });


    setTimeout(() => {
      this.router.navigate(['/events']);
    }, 3000);
  }



  }




