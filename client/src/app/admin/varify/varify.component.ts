import { Component, OnInit,OnDestroy } from '@angular/core';
import { AdminService } from 'src/app/common/service/admin.service';
import {saveAs} from 'file-saver';
import {totalCount} from '../../common/model/admin';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-varify',
  templateUrl: './varify.component.html',
  styleUrls: ['./varify.component.css']
})
export class VarifyComponent implements OnInit,OnDestroy {
  userprofile : any = [];
  recordCount : number;
  verifySub : Subscription;
  constructor(private adminService : AdminService) { }

  ngOnInit() {
    this.refreshData();
    setInterval(() => {
    this.refreshData();
  }, 5000);


  }


  refreshData(){
    this.verifySub = this.adminService.checkOut().subscribe((res)=>{
      this.userprofile = res;

    },
    (err)=>{
      console.log(err);
    }
    );
  }

  downloadFile(fname){
    console.log(fname);
    let filename = fname;

        this.adminService.downloadFile(filename)
        .subscribe(
            data => saveAs(data,filename),
            error => console.error(error)
      );


  }

  accept(req_userid){
    // console.log(req_userid);
    this.adminService.activeUser(req_userid).subscribe((res)=>{

      console.log(res);
    },
    (err)=>{
      console.log(err);
    });
    }


  reject(drecord){
    // console.log(`${drecord}is deleted!!! `);
    this.adminService.rejectUser(drecord).subscribe((res)=>{
      console.log(res);
    },
    (err)=>{
      console.log(err);
    });
    }

    RecordCount(){
      this.adminService.totalRecord().subscribe((res : totalCount)=>{
            this.recordCount=  res.totalRec;
      },
      (err)=>{
        console.log(err);
      });
      }

      ngOnDestroy(){
        console.log(this.verifySub.closed);
        this.verifySub.unsubscribe();
      }



    }







