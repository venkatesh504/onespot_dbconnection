import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Http } from '@angular/http';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss']
})
export class ContactUsComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;
  constructor(private formBuilder: FormBuilder, private apiCalling: Http) {
  }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      subject: ['', Validators.required],
      message: ['', [Validators.required, Validators.minLength(10)]]
    });
  }
  get f() { return this.registerForm.controls; }
  onSubmit() {
    console.log("enter submit", this.registerForm.value);
    this.submitted = true;
    this.apiCalling.post('http://localhost:3000/sent-mail', { test: true }).subscribe((contactUsResponse) => {
      console.log('Contact us response', contactUsResponse);
    })
    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }

    alert('SUCCESS!! :-)\n\n' + JSON.stringify("Thank you for Your valuable feedback"))
  }

}
