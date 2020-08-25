import { Component, OnInit } from "@angular/core";
import { GroceryService } from "../services/grocery.service";
import { BroadcastService } from "../services/broadcast.service";
import { AppEvent } from "../shared/appEvent";

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
    private broadcastService: BroadcastService
  ) {
    this.populateGroceryList();

    //dummy data for chore list
    this.tasks = [
      {
        taskId: 1,
        taskname: "Wash the dishes",
        username: "Jane",
        status: true,
      },
      {
        taskId: 2,
        taskname: "Vacuum the carpet",
        username: "John",
        status: false,
      },
      {
        taskId: 3,
        taskname: "Empty the trash",
        username: "Emily",
        status: true,
      },
    ];

    //dummy data for house users
    this.users = [
      { userId: 1, name: "Jane" },
      { userId: 2, name: "John" },
      { userId: 3, name: "Emily" },
    ];
  }

  ngOnInit() {
    this.subscribeToAppEvents();
  }

  populateGroceryList() {
    this.groceryService.getAllItems().subscribe((res) => {
      this.groceries = res;
    });
  }

  private removeGroceryItem(grocery) {
    let deleteItem = confirm(
      "Are you sure you want to delete " + grocery.name + "?"
    );

    if (deleteItem) {
      this.groceryService.deleteItem(grocery.itemId).subscribe(() => {
        "Delete " + grocery.name + "successful!";
        this.populateGroceryList();
      });
    }
  }

  private removeChoreTask(task) {
    let deleteItem = confirm(
      "Are you sure you want to delete " + task.taskname + "?"
    );

    if (deleteItem) {
      console.log("deleting " + task.taskname);
      //TODO: remove task item from DB
    }
    //otherwise do nothing
  }

  private checkboxGroceryChange(e: any) {
    if (e.target.checked) {
      const itemId = e.target.value;
      this.groceryService
        .boughtItem(itemId)
        .subscribe(() =>
        this.populateGroceryList()
        );
    } else {
      console.log("Grocery now unchecked");
    }
  }

  private checkboxChoreChange(e) {
    if (e.target.checked) {
      console.log("Chore now checked");
    } else {
      console.log("Chore now unchecked");
    }
  }

  private subscribeToAppEvents() {
    this.broadcastService.appEvent.subscribe((event: AppEvent) => {
      switch (event) {
        case AppEvent.UpdateGroceryList:
          this.populateGroceryList();
          break;
        default:
          break;
      }
    });
  }
}
