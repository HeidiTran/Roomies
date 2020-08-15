import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-chore-task',
  templateUrl: './add-chore-task.component.html',
  styleUrls: ['./add-chore-task.component.css']
})
export class AddChoreTaskComponent implements OnInit {
  addChoreTaskForm: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.addChoreTaskForm = this.formBuilder.group({
      taskName: ['', Validators.required],
    });
  }

  get form(){ return this.addChoreTaskForm.controls; }

  onSubmit(){
    // TODO: call the service to send the form task item to backend
    console.log(this.addChoreTaskForm.value);

    // TODO: if success: redirect to task list
    // TODO: if fail: alert the user and reset form
  }
}
