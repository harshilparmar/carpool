import { Component, OnInit, OnDestroy } from '@angular/core';
import { EventService } from "../common/service/event.service";

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit,OnDestroy {

      ridelist : any = [];
      rides;
  constructor(private eventService: EventService) { }

  ngOnInit() {
    this.rides = this.eventService.rideList()
      .subscribe(
        data => this.ridelist= data,
        err => console.log(err)
      );
  }

  ngOnDestroy() {

    this.rides.unsubscribe();

}
}
