import { Component, OnInit,ViewChild, OnDestroy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { LoadService } from 'src/app/common/service/load.service';
import { MatSnackBar } from '@angular/material';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-loadreg',
  templateUrl: './loadreg.component.html',
  styleUrls: ['./loadreg.component.css']
})
export class LoadregComponent implements OnInit,OnDestroy {
  @ViewChild('myform') formValues; // Added this
  minDate = new Date();
  loadSub : Subscription;
  constructor(private _formBuilder :  FormBuilder,
              private loadservice : LoadService,
              private snackBar: MatSnackBar) { }

  ngOnInit() {
  }

  loadDetail = this._formBuilder.group({
    departure_address: [null,Validators.required],
    arrival_address: [null,Validators.required],
    description: [null,Validators.required],
    dateofdel: [null,Validators.required],
    weight:  [null,Validators.required],
    type: [null,Validators.required],
    priority: [null,Validators.required]
  });

  getValue(data){

    data.userid = localStorage.getItem('userID');

    this.loadSub = this.loadservice.loadregister(data).subscribe((res)=>{

      this.snackBar.open('Request is sent!','OK', {
        duration: 1500,
      });

       this.loadDetail.reset();
    this.loadDetail.markAsPristine();

    this.loadDetail.markAsUntouched();
    });


  }


  ngOnDestroy(){
    // console.log(this.loadSub.closed)
  }


}
