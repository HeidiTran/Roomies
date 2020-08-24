import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JoinHouseComponent } from './join-house.component';

describe('JoinHouseComponent', () => {
  let component: JoinHouseComponent;
  let fixture: ComponentFixture<JoinHouseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JoinHouseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JoinHouseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
