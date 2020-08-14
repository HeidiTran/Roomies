import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {
  groceries: Object[];

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
   }
   private addGroceryItem = false;
   loadMyChildComponent(){
      this.addGroceryItem = true;
   }

   removeItem(grocery){
     console.log(this);
     let deleteItem = confirm('Are you sure you want to delete '+grocery.itemname+'?');
      
     if (deleteItem){
       console.log("deleting"+ grocery);
       //TODO: remove grocery item from DB
       
     }
     else{
       console.log("Not deleting" + grocery);
     }
   }

  ngOnInit() {
  }

}
