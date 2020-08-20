import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-edit-chore-task',
  templateUrl: './edit-chore-task.component.html',
  styleUrls: ['./edit-chore-task.component.css']
})
export class EditChoreTaskComponent implements OnInit {
  editChoreTaskForm: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.editChoreTaskForm = this.formBuilder.group({
      taskName: ['', Validators.required],
    });
  }

  get form(){ return this.editChoreTaskForm.controls; }

  onSubmit(){
    // TODO: call the service to send the form task item to backend
    console.log(this.editChoreTaskForm.value);

    // TODO: if success: redirect to task list
    // TODO: if fail: alert the user and reset form
  }

}
