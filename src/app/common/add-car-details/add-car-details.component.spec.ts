import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCarDetailsComponent } from './add-car-details.component';

describe('AddCarDetailsComponent', () => {
  let component: AddCarDetailsComponent;
  let fixture: ComponentFixture<AddCarDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddCarDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCarDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
