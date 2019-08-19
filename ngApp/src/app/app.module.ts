import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { FormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './common/route/app-routing.module';
import { ReactiveFormsModule } from "@angular/forms";
import { AppComponent } from './app.component';
import { OwnerRegComponent } from './register/owner-reg/owner-reg.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { EventsComponent } from './events/events.component';
import { SpecialEventComponent } from './special-event/special-event.component';
import { AuthServiceService } from "./common/service/auth-service.service";
import { AuthGuard } from "./common/guard/auth.guard";
import { TokenInterceptorService }  from './common/token-interceptor.service';
// import { AdminComponent } from './admin/admin.component';
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';

import {MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatCardModule,
        MatButtonModule,
        MatRadioModule,
        MatSlideToggleModule,
        MatStepperModule,
        MatTabsModule,
        MatSidenavModule,
        MatToolbarModule,
        MatIconModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatProgressBarModule,
        MatExpansionModule,
        MatBadgeModule,
        MatCheckboxModule,
        MatListModule,
        MatButtonToggleModule,
        MatAutocompleteModule,
        MatSnackBarModule,
        MatDialogModule
           }
      from '@angular/material';
import { ProfileComponent } from './profile/profile.component';
import { EventService } from './common/service/event.service';
import { UserprofileService } from './common/service/userprofile.service';
import { AdminService } from './common/service/admin.service';
// import { VarifyComponent } from './admin/varify/varify.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { WaitComponent } from './special-event/wait/wait.component';
import { RejectedComponent } from './special-event/rejected/rejected.component';
import { FindRideComponent } from './events/find-ride/find-ride.component';

import { CommonSearchComponent } from './events/common-search/common-search.component';
import { RideDetailComponent } from './events/ride-detail/ride-detail.component';
import { ErrorComponent } from './error/error.component';
import { LoadregComponent } from './loadshuttle/loadreg/loadreg.component';
import { LoadService } from './common/service/load.service';
import { MapComponent } from './map/map.component';
  // import { AdminModule } from './admin/admin.module';


@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    EventsComponent,
    SpecialEventComponent,
    // AdminComponent,
    OwnerRegComponent,
    ProfileComponent,
    WaitComponent,
    RejectedComponent,
    FindRideComponent,
    CommonSearchComponent,
    RideDetailComponent,
    ErrorComponent,
    LoadregComponent,
    MapComponent

  ],
  imports: [
    FormsModule,
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCardModule,
    MatButtonModule,
    MatRadioModule,
    MatSlideToggleModule,
    BrowserAnimationsModule,
    MatStepperModule,
    MatTabsModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTabsModule,
    MatProgressBarModule,
    MatExpansionModule,
    FlexLayoutModule,
    MatBadgeModule,
    NgxMaterialTimepickerModule.forRoot(),
    MatCheckboxModule,
    MatListModule,
    MatButtonToggleModule,
    MatAutocompleteModule,
    MatSnackBarModule,
    MatDialogModule,
    // AdminModule
  ],
  providers: [AuthServiceService, AuthGuard,EventService,UserprofileService,AdminService,LoadService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass:TokenInterceptorService,
     multi:true
    },
    MatDatepickerModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
