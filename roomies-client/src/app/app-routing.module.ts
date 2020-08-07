import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateAccountComponent } from './create-account/create-account.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { TransitionComponent } from './transition/transition.component';


const routes: Routes = [
  { path: 'newAccount', component: CreateAccountComponent },
  { path: 'signIn', component: SignInComponent },
  { path: 'transition', component: TransitionComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
