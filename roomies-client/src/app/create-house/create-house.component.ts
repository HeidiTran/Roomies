import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-house',
  templateUrl: './create-house.component.html',
  styleUrls: ['./create-house.component.css']
})
export class CreateHouseComponent implements OnInit {
  createHouseForm: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.createHouseForm = this.formBuilder.group({
      housename: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }
  get form() { return this.createHouseForm.controls; }

  onSubmit() {
    // TODO: call the service to send the form to backend
    console.log(this.createHouseForm.value);

    // TODO: if success: redirect to house sign in
    // TODO: if fail: alert the user and reset form
  }
}
