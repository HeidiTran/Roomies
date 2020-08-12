import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateAccountComponent } from './create-account/create-account.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { AddGroceryItemComponent } from './add-grocery-item/add-grocery-item.component';
import { TransitionComponent } from './transition/transition.component';
import { JoinHouseComponent } from './join-house/join-house.component';

const routes: Routes = [
  { path: 'newAccount', component: CreateAccountComponent },
  { path: 'signIn', component: SignInComponent },
  { path: 'addGroceryItem', component: AddGroceryItemComponent},
  { path: 'transition', component: TransitionComponent },
  { path: 'joinHouse', component: JoinHouseComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
