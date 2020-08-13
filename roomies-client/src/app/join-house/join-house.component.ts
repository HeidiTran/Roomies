import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-join-house',
  templateUrl: './join-house.component.html',
  styleUrls: ['./join-house.component.css']
})
export class JoinHouseComponent implements OnInit {
  joinHouseForm: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.joinHouseForm = this.formBuilder.group({
      housename: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }
  get form() { return this.joinHouseForm.controls; }

  onSubmit() {
    // TODO: call the service to send the form to backend
    console.log(this.joinHouseForm.value);

    // TODO: if success: redirect to house sign in
    // TODO: if fail: alert the user and reset form
  }
}
