import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { GroceryService } from "../services/grocery.service";
import { Router } from '@angular/router';

@Component({
  selector: "app-add-grocery-item",
  templateUrl: "./add-grocery-item.component.html",
  styleUrls: ["./add-grocery-item.component.css"],
})
export class AddGroceryItemComponent implements OnInit {
  addGroceryItemForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private groceryService: GroceryService
  ) {}

  ngOnInit() {
    this.addGroceryItemForm = this.formBuilder.group({
      houseId: parseInt(localStorage.getItem("houseId")),
      name: ["", Validators.required],
      quantity: [1, Validators.min(1)],
      price: [
        0,
        [
          Validators.required,
          Validators.min(0.01),
          Validators.pattern("^[0-9]*.[0-9][0-9]$"),
        ],
      ],
      bought: false,
    });
  }

  get form() {
    return this.addGroceryItemForm.controls;
  }

  onSubmit() {
    this.groceryService
      .addItem(this.addGroceryItemForm.value)
      .subscribe(() => console.log("Add item sucessful"));

    // TODO: if success: redirect to grocery list
    // TODO: if fail: alert the user and reset form
  }
}
