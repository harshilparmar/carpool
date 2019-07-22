import { Component, OnInit,OnDestroy } from '@angular/core';
import { AdminService } from '../common/service/admin.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit,OnDestroy {
  panelOpenState = false;
  adminSub : Subscription;
  userprofile : any = [{}];
  constructor(private adminService : AdminService) { }

  ngOnInit() {
    this.refreshData();
    setInterval(() => {
    this.refreshData();
  }, 5000);
  }


  refreshData(){

    this.adminSub = this.adminService.allProfile().subscribe((res)=>{
      this.userprofile = res;
      // console.log(this.userprofile);
    },
    (err)=>{
      console.log(err);
    }
    );
  }


  ngOnDestroy(){
    console.log(this.adminSub.closed);
    this.adminSub.unsubscribe();
  }



}
