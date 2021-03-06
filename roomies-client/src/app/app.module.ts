import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { TokenInterceptor } from './services/token-interceptor';
import { NavbarComponent } from './navbar/navbar.component';
import { CreateAccountComponent } from './create-account/create-account.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { AddGroceryItemComponent } from './add-grocery-item/add-grocery-item.component';
import { TransitionComponent } from './transition/transition.component';
import { JoinHouseComponent } from './join-house/join-house.component';
import { CreateHouseComponent } from './create-house/create-house.component';
import { HomepageComponent } from './homepage/homepage.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AddChoreTaskComponent } from './add-chore-task/add-chore-task.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    CreateAccountComponent,
    SignInComponent,
    AddGroceryItemComponent,
    TransitionComponent,
    JoinHouseComponent,
    CreateHouseComponent,
    HomepageComponent,
    DashboardComponent,
    AddChoreTaskComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
