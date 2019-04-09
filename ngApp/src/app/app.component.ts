import { Component, OnInit } from "@angular/core";
import { AuthServiceService } from "./common/service/auth-service.service";
import { UserprofileService } from "./common/service/userprofile.service";
@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  title = "ngApp";
  isAdmin  : Boolean = (localStorage.getItem('isAdmin') == "true");


  constructor(
    private _authService: AuthServiceService,
    private _userService: UserprofileService
  ) {}

  ngOnInit() {

  }
}
