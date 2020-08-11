import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-grocery-item',
  templateUrl: './add-grocery-item.component.html',
  styleUrls: ['./add-grocery-item.component.css']
})
export class AddGroceryItemComponent implements OnInit {
  addGroceryItemForm: FormGroup;
  
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.addGroceryItemForm = this.formBuilder.group({
      itemName: ['', Validators.required],
      quantity: [1,Validators.min(1)],
      price: [0, Validators.required, Validators.min(.01), Validators.pattern('^[0-9]*\.[0-9]{2}$ or ^[0-9]*\.[0-9][0-9]$')]
    });
  }

  get from(){ return this.addGroceryItemForm.controls; }

  onSubmit(){
    // TODO: call the service to send the form item to backend
    console.log(this.addGroceryItemForm.value);

    // TODO: if success: redirect to grocery list
    // TODO: if fail: alert the user and reset form
  }
}
