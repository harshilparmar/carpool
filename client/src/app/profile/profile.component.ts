import { Component, OnInit ,OnDestroy} from '@angular/core';
import { UserprofileService } from '../common/service/userprofile.service';
import { Validators, FormBuilder } from '@angular/forms';
import { UserDetail } from '../common/model/user_reg';
import { Router } from '@angular/router';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit,OnDestroy {
  // pandingReq
  userDetail : any = {};
  rideReq  : any = [];
  userRides : any = {};
  user$ :any = {};
  toggle : boolean = true;
  ridedetail : any = {};
  owenerRides : any = {};
  loadReq : any = [];
  loadReqaccepted : any = {};
  no_loadreq : boolean =  false;
  profile : any;
  constructor(private profileservice: UserprofileService,
              private fb: FormBuilder,
              private routing: Router ) { }


              updateForm = this.fb.group({
                first_name: [null,Validators.required],
                last_name : [null,Validators.required],
                userid : [null,[Validators.required, Validators.minLength(5)]],
                email:[null,[Validators.required,Validators.email]],
                phone:[null,[Validators.required,Validators.minLength(10)]],
                gender:[null,Validators.required],

              });



  ngOnInit() {
    this.refreshData();
    setInterval(() => {
    this.refreshData();
  },10000);

}

  refreshData(){
    this.profile = this.profileservice.getProfile(localStorage.getItem('userID')).subscribe((res : UserDetail)=>{
      this.userDetail = res;
      this.updateForm.patchValue({
        first_name: res.first_name,
        last_name: res.last_name,
        userid : res.userid,
        email :res.email,
        gender: res.gender,
        phone:  res.phone
    });

    },
    (err: any) => {
    console.log(err);
  });

  this.profileservice.pandingrequest().subscribe((res)=>{
              this.rideReq =  res;

  });


  this.profileservice.userRides().subscribe((res)=>{
    this.userRides =  res;

});

this.profileservice.owenerRides().subscribe((res)=>{
  this.owenerRides =  res;

});

this.profileservice.loadDetail().subscribe((res)=>{
  this.loadReq =  res;
  // console.log(this.loadReq)
});

// this.profileservice.loadAcceptDetail().subscribe((res)=>{
//   this.loadReqaccepted =  res;

// });




}



  update(val) {
    this.profileservice.updateProfile(localStorage.getItem('userID'), val).subscribe((res) => {
      console.log(res);
    },
      (err) => { console.log(err); });
  }

    user(data){
     this.profileservice.getProfile(data).subscribe((res)=>{
      this.user$ = res;
    });
    this.toggle = !this.toggle;

  }


  accept(id,rideid){

// console.log(id,rideid);
    let obj = {
      userID:id,
      rideID:rideid
    }
    console.log(obj)
    this.profileservice.acceptride(obj).subscribe((res)=>{
      console.log(res);
    });



  }

  reject(id){
   this.profileservice.rejectRide(id).subscribe((res)=>{
     console.log(res);
   });
  }

  redirect(){
    this.routing.navigate(['/beOwener']);

  }


  currentLocation(secondEmail){
    this.profileservice.secondEmail = secondEmail;
    this.routing.navigate(['/currentlocation']);
  }

  rideDetail(data){
    this.toggle = !this.toggle;
    this.profileservice.rideDetail(data).subscribe((res)=>{
        this.ridedetail =  res;
    });

  }

  acceptloadreq(userid,loadreqID){
    console.log(userid,loadreqID);

    let obj = {
      userID:userid,
      loadreqID:loadreqID,
      shippedID: localStorage.getItem('userID')
    }
    console.log(obj);
    this.profileservice.loadacceptride(obj).subscribe((res)=>{
      console.log(res);
    });


  }

///// remove element form dom based on id
  rejectloadreq(loadreqID){
  this.profileservice.loadrejectRide(loadreqID).subscribe((res)=>{
    console.log(res);
  });

}


  // showRides(){
  //   this.toggle = !this.toggle;
  // }

  ngOnDestroy(){

    this.profile.unsubscribe();


  }

}
