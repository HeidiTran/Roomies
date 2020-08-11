import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})
export class CreateAccountComponent implements OnInit {
  newAccountForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit() {
    this.newAccountForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  get form() { return this.newAccountForm.controls; }

  onSubmit() {
    // TODO: call the service to send the form to backend
    console.log(this.newAccountForm.value);

    // TODO: if success: redirect to login
    this.router.navigate(['/signIn']);

    // TODO: if fail: alert the user and reset form
  }

}
