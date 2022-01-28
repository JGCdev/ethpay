import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { HomeComponent } from './home/home.component';
import { SharedModule } from '../shared/shared.module';
import { TermsComponent } from './terms/terms.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [HomeComponent, TermsComponent],
  imports: [
    CommonModule,
    MainRoutingModule,
    SharedModule,
    FormsModule
  ]
})
export class MainModule { }
