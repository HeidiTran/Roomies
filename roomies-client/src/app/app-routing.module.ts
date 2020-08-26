import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateAccountComponent } from './create-account/create-account.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { AddGroceryItemComponent } from './add-grocery-item/add-grocery-item.component';
import { TransitionComponent } from './transition/transition.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  { path: 'newAccount', component: CreateAccountComponent },
  { path: 'signIn', component: SignInComponent },
  { path: 'transition', component: TransitionComponent },
  { path: 'dashboard', component: DashboardComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
