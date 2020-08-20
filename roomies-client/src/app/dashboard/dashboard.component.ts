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
   //Hide Add grocery item and chore task forms on page loading
   private addGroceryItem = false;
   private addChoreTask = false;
   private editItemBool = true;
   private editChoreBool = true;

   private removeGroceryItem(grocery){
     console.log(this);
     let deleteItem = confirm('Are you sure you want to delete '+grocery.itemname+'?');

     if (deleteItem){
       console.log("deleting "+ grocery.itemname);
       //TODO: remove grocery item from DB
     }
     else{
       console.log("Not deleting " + grocery.itemname);
     }
   }

   private editGroceryItem(){
      console.log("Edit grocery item");
      this.editItemBool = true;
      console.log(this.editItemBool);
   }

   private removeChoreTask(task){
    console.log(this);
    let deleteItem = confirm('Are you sure you want to delete '+task.taskname+'?');
     
    if (deleteItem){
      console.log("deleting "+ task.taskname);
      //TODO: remove task item from DB   
    }
    else{
      console.log("Not deleting " + task.taskname);
    }
  }
  private editChoreTask(){
    console.log("Edit chore task");
    this.editChoreBool = true;
    console.log(this.editChoreBool);
 }

  ngOnInit() {
  }

}
