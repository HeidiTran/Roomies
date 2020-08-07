import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  signInForm: FormGroup;
  constructor(private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit() {
    this.signInForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  get form() { return this.signInForm.controls; }

  onSubmit() {
    // TODO: call the service to send the form to backend
    console.log(this.signInForm.value);

    // TODO: if success: redirect to transition page
    this.router.navigate(['/transition']);

    // TODO: if fail: alert the user and reset form
  }
}


