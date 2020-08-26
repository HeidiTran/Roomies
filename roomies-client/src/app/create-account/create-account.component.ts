import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "../services/auth.service";

@Component({
  selector: "app-create-account",
  templateUrl: "./create-account.component.html",
  styleUrls: ["./create-account.component.css"],
})
export class CreateAccountComponent implements OnInit {
  newAccountForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.newAccountForm = this.formBuilder.group({
      email: ["", [Validators.required, Validators.email]],
      username: ["", Validators.required],
      password: ["", [Validators.required, Validators.minLength(8)]],
    });
  }

  get form() {
    return this.newAccountForm.controls;
  }

  onSubmit() {
    this.authService
      .createNewUserAccount(this.newAccountForm.value)
      .subscribe(() => {
        alert("Registration successful!");
        this.router.navigate(["/signIn"]);
      });
  }
}
