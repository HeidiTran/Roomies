import { Component, OnInit } from "@angular/core";
import { GroceryService } from "../services/grocery.service";
import { BroadcastService } from "../services/broadcast.service";
import { AppEvent } from "../shared/appEvent";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ChoreService } from "../services/chore.service";
import { Item } from "../shared/item";
import { Task } from "../shared/task";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"],
})
export class DashboardComponent implements OnInit {
  groceries: any = [];
  tasks: any = [];
  users: Object[];

  constructor(
    private groceryService: GroceryService,
    private broadcastService: BroadcastService,
    private formBuilder: FormBuilder,
    private choreService: ChoreService
  ) {
    this.populateGroceryList();
    this.populateChoreList();
  }

  ngOnInit() {
    this.subscribeToAppEvents();
    this.setupEditItemForm();
  }

  private populateGroceryList() {
    this.groceryService.getAllItems().subscribe((res) => {
      this.groceries = res;
    });
  }

  private populateChoreList() {
    this.choreService.getAllTasks().subscribe((res) => {
      this.tasks = res;
    });
  }

  removeGroceryItem(item: Item) {
    let deleteItem = confirm(
      "Are you sure you want to delete " + item.name + "?"
    );

    if (deleteItem) {
      this.groceryService.deleteItem(item.itemId).subscribe(() => {
        this.populateGroceryList();
      });
    }
  }

  removeChoreTask(task: Task) {
    let deleteItem = confirm(
      "Are you sure you want to delete " + task.name + " task ?"
    );

    if (deleteItem) {
      this.choreService.deleteTask(task.taskId).subscribe(() => {
        this.populateChoreList();
      });
    }
  }

  checkboxGroceryChange(e: any) {
    if (e.target.checked) {
      const itemId = e.target.value;
      this.groceryService
        .boughtItem(itemId)
        .subscribe(() => this.populateGroceryList());
    }
  }

  checkboxChoreChange(e) {
    if (e.target.checked) {
      const taskId = e.target.value;
      this.choreService
        .doneTask(taskId)
        .subscribe(() => this.populateChoreList());
    }
  }

  private subscribeToAppEvents() {
    this.broadcastService.appEvent.subscribe((event: AppEvent) => {
      switch (event) {
        case AppEvent.UpdateGroceryList:
          this.populateGroceryList();
          break;
        case AppEvent.UpdateChoreList:
          this.populateChoreList();
          break;
        default:
          break;
      }
    });
  }

  ////////////////////// Edit Item Form //////////////////////////////
  itemId: number = null;
  editGroceryItemForm: FormGroup;
  private setupEditItemForm() {
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
  }

  private initEditItemForm() {
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

  editItem(id: number) {
    this.itemId = id;
    this.initEditItemForm();
  }

  onSubmit() {
    console.log(this.editGroceryItemForm.value);
    this.groceryService
      .updateItem(this.itemId, this.editGroceryItemForm.value)
      .subscribe(() => {
        this.populateGroceryList();
        this.editGroceryItemForm.reset();
        alert("Success!");
      });

    // TODO: if fail: alert the user and reset form
  }
}
