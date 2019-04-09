import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { RouterModule, Routes } from '@angular/router';
import { VarifyComponent } from './varify/varify.component';

import {MatExpansionModule,
  MatBadgeModule,
  MatCardModule,
  MatButtonModule
     }
from '@angular/material';
const routes: Routes = [
    {
        path:'',component : AdminComponent, children:[{
          path:'varify',component:VarifyComponent
      }]
    }
];


@NgModule({
  declarations: [
    AdminComponent,
    VarifyComponent
  ],
  imports: [
    MatExpansionModule,
    CommonModule,
    RouterModule.forChild(routes),
    MatBadgeModule,
    MatCardModule,
    MatButtonModule
  ],
  exports :[
    AdminComponent,
    // VarifyComponent
  ]

})
export class AdminModule { }
