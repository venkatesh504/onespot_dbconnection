import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { FooterComponent } from './footer/footer.component'; 
import  { HttpClientModule } from '@angular/common/http'


@NgModule({
  declarations: [HeaderComponent, ContactUsComponent, FooterComponent],
  imports: [
    CommonModule
  ],
  exports:[
    HeaderComponent,
    FooterComponent,
    ContactUsComponent,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ]
})
export class CommonFilesModule { }
