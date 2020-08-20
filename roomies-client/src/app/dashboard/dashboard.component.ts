import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {
  groceries: Object[];
  tasks: Object[];

  constructor() {
    //dummy data for grocery list
    this.groceries = [
      {
        itemname: "Bread",
        price: "5.00",
        quantity: 4
      },
      {
        itemname: "Eggs",
        price: "2.25",
        quantity: 4
      },
      {
        itemname: "Avocados",
        price: "3.99",
        quantity: 4
      },
    ];

    //dummy data for chore list
    this.tasks = [
      {
        taskname: "Wash the dishes"
      },
      {
        taskname: "Vacuum the carpet"
      },
      {
        taskname: "Empty the trash"
      },
    ]
   }

   private addGroceryItem = false;
   private editItemBool = true;

   private addChoreTask = false;
   private editChoreBool = true;


   private removeGroceryItem(grocery){
     console.log(this);
     let deleteItem = confirm('Are you sure you want to delete '+grocery.itemname+'?');

     if (deleteItem){
       console.log("deleting "+ grocery.itemname);
       //TODO: remove grocery item from DB
     }
     //otherwise do nothing
   }

   private editGroceryItem(){
      this.editItemBool = true;
   }

   private removeChoreTask(task){
    let deleteItem = confirm('Are you sure you want to delete '+task.taskname+'?');
     
    if (deleteItem){
      console.log("deleting "+ task.taskname);
      //TODO: remove task item from DB   
    }
    //otherwise do nothing
  }
  private editChoreTask(){
    this.editChoreBool = true;
 }

  ngOnInit() {
  }

}
