import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditChoreTaskComponent } from './edit-chore-task.component';

describe('EditChoreTaskComponent', () => {
  let component: EditChoreTaskComponent;
  let fixture: ComponentFixture<EditChoreTaskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditChoreTaskComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditChoreTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
