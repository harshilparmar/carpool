import { Injectable } from '@angular/core';
import { CanActivate ,Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthServiceService } from "../service/auth-service.service";
import { UserprofileService } from '../service/userprofile.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router : Router,
              private service: AuthServiceService,
              private userService : UserprofileService ){}



  canActivate(next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean
    {
      // todo val is not used
    let val = this.service.loggedIn();
    let validOwener = this.userService.offerRideCheck();  //carowener true of false
    //rejected by admin
    let reject = this.userService.beingReject();
      if(val){

          if(state.url.indexOf('special')!=-1 && !validOwener && !reject){

            return this.router.navigate(['/response/wait']);
          }
          else if(state.url.indexOf('special')!=-1 && reject){
            return this.router.navigate(['/response/reject']);}
          else if(state.url.indexOf('special')!=-1 && validOwener && !reject){
            return true;}
          else if(state.url.indexOf('profile')!=-1){
            return true;}
              else if(state.url.indexOf('beOwener')!=-1){
              return true;}
              else if(state.url.indexOf('admin')!=-1){
              return true;}
              else if(state.url.indexOf('load')!=-1){
                return true;}
              else if(state.url.indexOf('currentlocation')!=-1){
                return true;}
      }

      else{
        this.router.navigate(['/register']);
        return false;
      }
  }

}
