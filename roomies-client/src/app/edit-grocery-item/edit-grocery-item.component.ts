import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-grocery-item',
  templateUrl: './edit-grocery-item.component.html',
  styleUrls: ['./edit-grocery-item.component.css']
})
export class EditGroceryItemComponent implements OnInit {
  editGroceryItemForm: FormGroup;

  constructor(private formBuilder: FormBuilder) { }
  
  ngOnInit() {
    this.editGroceryItemForm = this.formBuilder.group({
      name: ['', Validators.required],
      quantity: [1, Validators.min(1)],
      price: [0, [Validators.required, Validators.min(.01), Validators.pattern('^[0-9]*\.[0-9][0-9]$')]]
    });
  }

  get form(){ return this.editGroceryItemForm.controls; }

  onSubmit(){
    // TODO: call the service to send the edited form item to backend
    console.log(this.editGroceryItemForm.value);

    // TODO: if success: redirect to grocery list
    // TODO: if fail: alert the user and reset form
  }
}
