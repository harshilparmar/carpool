import { Component, OnInit } from '@angular/core';
import { EventService } from 'src/app/common/service/event.service';
import {map, startWith} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-common-search',
  templateUrl: './common-search.component.html',
  styleUrls: ['./common-search.component.css']
})
export class CommonSearchComponent implements OnInit {
  myControl = new FormControl();

  searchResult : object;
  now : Date = new Date();
  today: string = this.now.toISOString();

  options: string[] = ['Vadodara', 'Surat', 'Aanand'];
  filteredOptions: Observable<string[]>;

  constructor(private service : EventService) { }

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  search(keyword : HTMLInputElement){
    // console.log(keyword.value);
    let obj = { keyword : keyword.value}
    this.service.commonRideSearch(obj)
    .subscribe(
      data => this.searchResult = data,
      err => console.log(err)
    );
}

  }



