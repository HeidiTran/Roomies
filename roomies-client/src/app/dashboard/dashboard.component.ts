import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {
  groceries: Object[];
  tasks: Object[];
  users: Object[];

  constructor() {
    //dummy data for grocery list
    this.groceries = [
      {
        itemId: 1,
        name: "Bread",
        price: "5.00",
        quantity: 4,
        bought: true,
      },
      {
        itemId: 2,
        name: "Eggs",
        price: "2.25",
        quantity: 4,
        bought: false,
      },
      {
        itemId: 3,
        name: "Avocados",
        price: "3.99",
        quantity: 4,
        bought: true,
      },
    ];

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
      { userId: 3, name: "Emily" }
    ];

  }

  private addGroceryItem = false;
  private addChoreTask = false;

  private removeGroceryItem(grocery) {
    let deleteItem = confirm('Are you sure you want to delete ' + grocery.name + '?');

    if (deleteItem) {
      console.log("deleting " + grocery.name);
      //TODO: remove grocery item from DB
    }
    //otherwise do nothing
  }

  private removeChoreTask(task) {
    let deleteItem = confirm('Are you sure you want to delete ' + task.taskname + '?');

    if (deleteItem) {
      console.log("deleting " + task.taskname);
      //TODO: remove task item from DB   
    }
    //otherwise do nothing
  }

  private checkboxGroceryChange(e){
    if(e.target.checked){
      console.log("Grocery now checked");
    }
    else{
      console.log("Grocery now unchecked");
    }
  }

  private checkboxChoreChange(e){
    if(e.target.checked){
      console.log("Chore now checked");
    }
    else{
      console.log("Chore now unchecked");
    }
  }


  ngOnInit() {
  }

}
