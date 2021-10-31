import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EventsComponent } from '../../events/events.component';
import { SpecialEventComponent } from '../../special-event/special-event.component';
import { LoginComponent } from '../../login/login.component';
import { RegisterComponent } from '../../register/register.component';
import { AuthGuard } from "../guard/auth.guard";
// import { AdminComponent } from "../../admin/admin.component";
import { OwnerRegComponent } from "../../register/owner-reg/owner-reg.component";
import { ProfileComponent } from 'src/app/profile/profile.component';
// import { VarifyComponent } from 'src/app/admin/varify/varify.component';
import { WaitComponent } from 'src/app/special-event/wait/wait.component';
import { RejectedComponent } from 'src/app/special-event/rejected/rejected.component';
import { RideDetailComponent } from 'src/app/events/ride-detail/ride-detail.component';
import { ErrorComponent } from 'src/app/error/error.component';
import { LoadregComponent } from 'src/app/loadshuttle/loadreg/loadreg.component';
import { MapComponent } from 'src/app/map/map.component';
// import { AdminModule } from './admin/admin.module';

const routes: Routes = [

  {
    path: '', pathMatch: 'full', redirectTo: '/events'
  },
  {
    path: 'events',
    component: EventsComponent
  },{
    path: 'events/:id',
    component: RideDetailComponent
  },
  {
    path: 'special',
    component: SpecialEventComponent,
    canActivate : [AuthGuard]
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'admin',
    loadChildren : '../../admin/admin.module#AdminModule',
    // canActivate : [AuthGuard]

  },
  {
    path: 'beOwener',
    component: OwnerRegComponent,
    canActivate : [AuthGuard]

  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate : [AuthGuard]

  },
  {
    path: 'load',
    component: LoadregComponent,
    canActivate : [AuthGuard]

  },
  {
    path: 'currentlocation',
    component: MapComponent,
    canActivate : [AuthGuard]
  },
  {
    path: 'response',
    children: [{
      path: 'wait',
      component: WaitComponent
    },
    {

      path: 'reject',
      component: RejectedComponent
    }]
  },
  { path: '**', component: ErrorComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
