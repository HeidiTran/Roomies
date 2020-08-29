import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ChoreService } from "../services/chore.service";
import { BroadcastService } from "../services/broadcast.service";
import { AppEvent } from "../shared/appEvent";
import { AuthService } from "../services/auth.service";

@Component({
  selector: "app-add-chore-task",
  templateUrl: "./add-chore-task.component.html",
  styleUrls: ["./add-chore-task.component.css"],
})
export class AddChoreTaskComponent implements OnInit {
  addChoreTaskForm: FormGroup;
  users: Object[];

  constructor(
    private formBuilder: FormBuilder,
    private choreService: ChoreService,
    private broadcastService: BroadcastService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.populateUserList();
    this.addChoreTaskForm = this.formBuilder.group({
      houseId: parseInt(localStorage.getItem("houseId")),
      name: ["", Validators.required],
      userId: ["", Validators.required],
    });
  }

  private populateUserList() {
    this.authService.getAllUsers().subscribe((res) => (this.users = res));
  }

  get form() {
    return this.addChoreTaskForm.controls;
  }

  assignTo(id: string) {
    this.addChoreTaskForm.get("userId").setValue(parseInt(id));
  }

  private resetForm() {
    this.addChoreTaskForm.reset();
    this.addChoreTaskForm
      .get("houseId")
      .setValue(parseInt(localStorage.getItem("houseId")));
    this.addChoreTaskForm.get("name").setValue("");
    this.addChoreTaskForm.get("userId").setValue("");
  }

  onSubmit() {
    // TODO: call the service to send the form task item to backend
    console.log(this.addChoreTaskForm.value);

    this.choreService.addTask(this.addChoreTaskForm.value).subscribe(() => {
      alert("Success!");
      this.resetForm();
      this.broadcastService.broadcast(AppEvent.UpdateChoreList);
    });

    // TODO: if fail: alert the user and reset form
  }
}
