import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-edit-chore-task',
  templateUrl: './edit-chore-task.component.html',
  styleUrls: ['./edit-chore-task.component.css']
})
export class EditChoreTaskComponent implements OnInit {
  editChoreTaskForm: FormGroup;
  users: Object[];

  constructor(private formBuilder: FormBuilder) {

    //dummy data for house users
    this.users = [
      { userId: 1, name: "Jane" },
      { userId: 2, name: "John" },
      { userId: 3, name: "Emily" },
    ];

   }

  ngOnInit() {
    this.editChoreTaskForm = this.formBuilder.group({
      name: ['', Validators.required],
      userId: ['', Validators.required],
    });
  }

  get editChoreForm(){ return this.editChoreTaskForm.controls; }

  assignTo(id: string) {
    this.editChoreTaskForm.get("userId").setValue(parseInt(id));
  }

  onSubmitEditChore(){
    // TODO: call the service to send the form task item to backend
    console.log(this.editChoreTaskForm.value);

    // TODO: if success: redirect to task list
    // TODO: if fail: alert the user and reset form
  }

}
