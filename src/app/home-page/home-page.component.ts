import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
  providers: [ToastrService]
})
export class HomePageComponent implements OnInit {
  registerForm: FormGroup;
  updateMail: FormGroup;
  submitted = false;
  done = false;
  contactUs: any = [];
  loading: any = false;
  constructor(private router: Router, private formBuilder: FormBuilder, private apiCalling: HttpClient, private toastr: ToastrService) { }

  ngOnInit() {

    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      subject: ['', Validators.required],
      message: ['', [Validators.required, Validators.minLength(10)]]

    });
    this.updateMail = this.formBuilder.group({
      emailUpdate: ['', [Validators.required, Validators.email]]
    });

  }
  get f() { return this.registerForm.controls; }
  get f1() { return this.updateMail.controls; }

  onSubmit() {
    console.log("enter submit", this.registerForm.value);
    this.submitted = true;
    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }
    this.loading = true;
    return this.apiCalling.post('http://localhost:3000/send-mail', this.registerForm.value)
      .toPromise()
      .then((data) => {
        this.loading = false;
        if (data && data['response'] && data['accepted'] && data['accepted'].length > 0) {
          console.log('success')
          this.toastr.success('Thank you for contacting us', 'Sent!')
          this.router.navigate(['/']);
        } else {
          console.log('Not sent')
          this.toastr.error('Email not sent', 'Something went wrong')
        }
        console.log('Data----------', data)
      });
  }

  onUpdate() {
    console.log("enter submit", this.updateMail.value);
    this.done = true;
    if (this.updateMail.invalid) {
      return;
    }
    console.log("error");
    return this.apiCalling.post('http://localhost:3000/updates', this.updateMail.value)
      .toPromise()
      .then((data) => {
        if (data && data['response'] && data['accepted'] && data['accepted'].length > 0) {
          console.log('success')
          this.toastr.success('Thank you for contacting us', 'Sent!')
          this.router.navigate(['/']);
        } else {
          console.log('Not sent')
          this.toastr.error('Email not sent', 'Something went wrong')
        }
        console.log('Data----------', data)
      });
  }

}
