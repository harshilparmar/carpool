import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { EventService } from 'src/app/common/service/event.service';

@Component({
  selector: 'app-find-ride',
  templateUrl: './find-ride.component.html',
  styleUrls: ['./find-ride.component.css']
})
export class FindRideComponent implements OnInit {

  searchedResult : object;
  now : Date = new Date();
  today: string = this.now.toISOString();

  constructor(private fb: FormBuilder,
      private service : EventService) { }

  ngOnInit() {

  }

  findRide = this.fb.group({
    src : [null,Validators.required],
    des : [null,Validators.required]
  });

  onFormSubmit(value): void {
    console.log(value);

    this.service.searchRide(value).subscribe((res)=>{
        this.searchedResult = res;
    });


}


getFlag(arg){
  //console.log(arg);
  //console.log(new Date(arg).toLocaleDateString() >= new Date(this.today).toLocaleDateString());
  return (new Date(arg).toLocaleDateString() >= new Date(this.today).toLocaleDateString());

}




}
