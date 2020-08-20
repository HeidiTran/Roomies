import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { HouseService } from '../services/house.service';
import { Router } from '@angular/router';

@Component({
  selector: "app-join-house",
  templateUrl: "./join-house.component.html",
  styleUrls: ["./join-house.component.css"],
})
export class JoinHouseComponent implements OnInit {
  joinHouseForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private houseService: HouseService,
    private router: Router
  ) {}

  ngOnInit() {
    this.joinHouseForm = this.formBuilder.group({
      name: ["", Validators.required],
      password: ["", [Validators.required, Validators.minLength(8)]],
    });
  }
  get form() {
    return this.joinHouseForm.controls;
  }

  onSubmit() {
    this.houseService.joinHouse(this.joinHouseForm.value)
    .subscribe(() => {
      this.router.navigate(["dashboard"]);
    });
  }
}
