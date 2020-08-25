import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditGroceryItemComponent } from './edit-grocery-item.component';

describe('EditGroceryItemComponent', () => {
  let component: EditGroceryItemComponent;
  let fixture: ComponentFixture<EditGroceryItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditGroceryItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditGroceryItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
