import { Component, OnInit } from "@angular/core";
import { AuthServiceService } from "src/app/common/service/auth-service.service";
import { UserprofileService } from "../common/service/userprofile.service";

@Component({
  selector: "app-navigation",
  templateUrl: "./navigation.component.html",
  styleUrls: ["./navigation.component.css"]
})
export class NavigationComponent implements OnInit {
  constructor(
    private _authService: AuthServiceService,
    private _userService: UserprofileService
  ) {}

  ngOnInit() {}
}
