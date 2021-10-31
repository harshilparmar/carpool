import { Component, OnInit ,ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { UserprofileService } from "../../common/service/userprofile.service";
@Component({
  selector: 'app-owner-reg',
  templateUrl: './owner-reg.component.html',
  styleUrls: ['./owner-reg.component.css']
})
export class OwnerRegComponent implements OnInit {

  UserImageFile : File;
  maxDate = new Date();
  owenerService : any;
  @ViewChild('uploadoc') user_image;

  constructor(private _formBuilder: FormBuilder,
              private routing: Router,
              private service: UserprofileService  ) { }

  ngOnInit() {

  }

      owenerForm = this._formBuilder.group({
        licence_number: [null,Validators.required],
        licence_date:  [null,Validators.required],
        uploadfile : [null,Validators.required],
        Uemail: [null,[Validators.required,Validators.email]]
      });


  skip(){
    this.routing.navigate(['/special']);

  }

  getValue(value)
  {
    let currentUser = localStorage.getItem('userID');
    const img = this.user_image.nativeElement;
    if(img.files && img.files[0]){
      this.UserImageFile = img.files[0];
    }

      const ImageFile : File = this.UserImageFile;
      // console.log(ImageFile.name);
    const formData :  FormData = new FormData();
    formData.append('userid', currentUser);
    formData.append('licence_number', value.licence_number);
    formData.append('licence_date', value.licence_date);
    formData.append('uploadfile',ImageFile,ImageFile.name);

    // console.log(formData.getAll());

    this.owenerService = this.service.tempregister(formData).subscribe((res)=>{
      console.log(res);
      this.routing.navigate(['/special']);
    },
    (err)=>{
      console.log(err);
    });

  }


}

