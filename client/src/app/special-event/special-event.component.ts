import { Component, OnInit } from '@angular/core';
import { EventService } from "../common/service/event.service";
import {  HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Validators, FormBuilder, FormArray } from '@angular/forms';
import { OfferRide } from '../common/model/offeredRide';
import { MatSnackBar } from '@angular/material';
@Component({
  selector: 'app-special-event',
  templateUrl: './special-event.component.html',
  styleUrls: ['./special-event.component.css']
})
export class SpecialEventComponent implements OnInit {

  events : any = [];
  toggle : boolean = true;
  offer$;
   minDate = new Date();

  constructor(private eventService: EventService,
              private routing: Router,
              private fb: FormBuilder,
              private snackBar: MatSnackBar) { }

              offerRide  = this.fb.group({
                departing_from : [null,Validators.required],
                arriving_at : [null,Validators.required],
                departing_date: [null,Validators.required],
                departure_time: [null,Validators.required],
                waypoints : [null],
                roundtrip : [false,Validators.required],
                returndate : [null,Validators.required],
                returntime : [null,Validators.required],
                vehicle_type : [null,Validators.required],
                vehicle_number : [null,[Validators.required,Validators.pattern('(([A-Za-z]){2,3}(|-)(?:[0-9]){1,2}(|-)(?:[A-Za-z]){2}(|-)([0-9]){1,4})|(([A-Za-z]){2,3}(|-)([0-9]){1,4})')]],
                number_sits : [null,[Validators.required,Validators.min(1)] ],
                source_faddress : [null,Validators.required],
                des_faddress : [null,Validators.required],
                preferences : this.fb.group({
                  chattiness:  [true,Validators.required],
                Smoking: [false,Validators.required],
                pets: [true,Validators.required],
                music: [true,Validators.required],
                })

        });


  ngOnInit() {
  }

//   initAddress() {
//     // initialize our address
//     return this.fb.group({
//       returndate : [null,Validators.required],
//       returntime : [null,Validators.required]
//     });
// }

// addControl() {
// // add address to the list
// const control = <FormArray>this.offerRide.controls['returntrip'];
// control.push(this.initAddress());
// }
// removeControl(i: number){
//   const control = <FormArray>this.offerRide.controls['returntrip'];
//     control.removeAt(i);
// }

  onFormSubmit(value): void {
    // console.log(value);

    value.owenerID = localStorage.getItem('userID');

     this.eventService.offerRide(value).subscribe((res)=>{
       this.offer$ =  res;
      //  console.log(this.offer$);
     },(err)=>{
        console.log(err);
    });
    // alert('done!'); //change this
    this.snackBar.open('Booking is Done!','OK', {
      duration: 1500,
    });

    this.offerRide.reset();
    this.offerRide.markAsPristine();
    this.offerRide.markAsUntouched();

    // let convert = new Date(value.departuredate,36);
    // console.log(formData.values());

    }

checkfun(val){
   if(val == true){
      this.toggle = false;
   }
   if(val == false){
    this.toggle = true;

 }
}



}
