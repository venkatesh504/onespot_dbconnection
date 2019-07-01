import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageRoutingModule } from './home-page-routing.module';
import { HomePageComponent } from './home-page.component';
import {CommonFilesModule} from './../common-files/common-files.module';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms'; 
import  { HttpClientModule } from '@angular/common/http'


@NgModule({
  declarations: [HomePageComponent],
  imports: [
    CommonModule,
    HomePageRoutingModule,
    CommonFilesModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ]
})
export class HomePageModule { }
