import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateAccountComponent } from './create-account/create-account.component';
import { SignInComponent } from './sign-in/sign-in.component';


const routes: Routes = [
  { path: 'newAccount', component: CreateAccountComponent },
  { path: 'signIn', component: SignInComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
