import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddChoreTaskComponent } from './add-chore-task.component';

describe('AddChoreTaskComponent', () => {
  let component: AddChoreTaskComponent;
  let fixture: ComponentFixture<AddChoreTaskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddChoreTaskComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddChoreTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
