import { Component, OnInit } from "@angular/core";
import { GroceryService } from "../services/grocery.service";
import { BroadcastService } from "../services/broadcast.service";
import { AppEvent } from "../shared/appEvent";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ChoreService } from "../services/chore.service";
import { Item } from "../shared/item";
import { Task } from "../shared/task";
import { AuthService } from "../services/auth.service";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"],
})
export class DashboardComponent implements OnInit {
  groceries: any = [];
  tasks: any = [];

  constructor(
    private groceryService: GroceryService,
    private broadcastService: BroadcastService,
    private formBuilder: FormBuilder,
    private choreService: ChoreService,
    private authService: AuthService
  ) {
    this.populateGroceryList();
    this.populateChoreList();
    this.populateUserList();
  }

  ngOnInit() {
    this.subscribeToAppEvents();
    this.setupEditItemForm();
    this.setupEditTaskForm();
  }

  private populateGroceryList() {
    this.groceryService
      .getAllItems()
      .subscribe((res) => (this.groceries = res));
  }

  private populateChoreList() {
    this.choreService.getAllTasks().subscribe((res) => (this.tasks = res));
  }

  private populateUserList() {
    this.authService.getAllUsers().subscribe((res) => (this.users = res));
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
    this.groceryService
      .updateItem(this.itemId, this.editGroceryItemForm.value)
      .subscribe(() => {
        this.populateGroceryList();
        this.editGroceryItemForm.reset();
        alert("Success!");
      });

    // TODO: if fail: alert the user and reset form
  }

  ////////////////////// Edit Task Form //////////////////////////////
  taskId: number = null;
  users: any = [];
  editChoreTaskForm: FormGroup;

  private setupEditTaskForm() {
    this.editChoreTaskForm = this.formBuilder.group({
      name: ["", Validators.required],
      userId: [1, Validators.required],
      status: false,
    });
  }

  private initEditTaskForm() {
    this.choreService.getTask(this.taskId).subscribe((res) => {
      this.editChoreTaskForm.get("name").setValue(res.name);
      this.editChoreTaskForm.get("status").setValue(res.status);
      this.editChoreTaskForm.get("userId").setValue(res.userId);
    });
  }

  get editChoreForm() {
    return this.editChoreTaskForm.controls;
  }

  editTask(id: number) {
    this.taskId = id;
    this.initEditTaskForm();
  }

  assignTo(id: string) {
    this.editChoreTaskForm.get("userId").setValue(parseInt(id));
  }

  onSubmitEditChore() {
    console.log(this.editChoreTaskForm.value);
    this.choreService
      .editTask(this.taskId, this.editChoreTaskForm.value)
      .subscribe(() => {
        this.populateChoreList();
        this.editChoreTaskForm.reset();
        alert("Success!");
      });

    // TODO: if fail: alert the user and reset form
  }
}
