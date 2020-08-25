import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { GroceryService } from "../services/grocery.service";
import { BroadcastService } from "../services/broadcast.service";
import { AppEvent } from "../shared/appEvent";

@Component({
  selector: "app-edit-grocery-item",
  templateUrl: "./edit-grocery-item.component.html",
  styleUrls: ["./edit-grocery-item.component.css"],
})
export class EditGroceryItemComponent implements OnInit {
  itemId = 3;

  editGroceryItemForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private groceryService: GroceryService,
    private broadcastService: BroadcastService
  ) {}

  ngOnInit() {
    this.editGroceryItemForm = this.formBuilder.group({
      itemId: this.itemId,
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

    this.groceryService.getItem(this.itemId).subscribe((res) => {
      this.editGroceryItemForm.get("name").setValue(res.name);
      this.editGroceryItemForm.get("quantity").setValue(res.quantity);
      this.editGroceryItemForm.get("price").setValue(res.price);
      this.editGroceryItemForm.get("bought").setValue(res.bought);
    });
  }

  get form() {
    return this.editGroceryItemForm.controls;
  }

  onSubmit() {
    console.log(this.editGroceryItemForm.value);
    this.groceryService
      .updateItem(this.itemId, this.editGroceryItemForm.value)
      .subscribe(() => {
        alert("Success!");
        this.broadcastService.broadcast(AppEvent.UpdateGroceryList);
      });

    // TODO: if fail: alert the user and reset form
  }
}
