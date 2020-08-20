import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { HouseService } from '../services/house.service';

@Component({
  selector: "app-join-house",
  templateUrl: "./join-house.component.html",
  styleUrls: ["./join-house.component.css"],
})
export class JoinHouseComponent implements OnInit {
  joinHouseForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private houseService: HouseService
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
    // TODO: call the service to send the form to backend
    console.log(this.joinHouseForm.value);

    this.houseService.joinHouse(this.joinHouseForm.value)
    .subscribe((res) => {
      console.log(res);
      console.log("Join house sucessful!");
    });

    // TODO: if success: redirect to house sign in
    // TODO: if fail: alert the user and reset form
  }
}
