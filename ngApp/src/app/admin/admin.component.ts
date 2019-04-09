import { Component, OnInit } from '@angular/core';
import { AdminService } from '../common/service/admin.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  panelOpenState = false;

  userprofile : any = [{}];
  constructor(private adminService : AdminService) { }

  ngOnInit() {
    this.refreshData();
    setInterval(() => {
    this.refreshData();
  }, 5000);
  }


  refreshData(){

    this.adminService.allProfile().subscribe((res)=>{
      this.userprofile = res;
      // console.log(this.userprofile);
    },
    (err)=>{
      console.log(err);
    }
    );
  }

}
