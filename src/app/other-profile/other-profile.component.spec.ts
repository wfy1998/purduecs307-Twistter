import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OtherProfileComponent } from './other-profile.component';

describe('OtherProfileComponent', () => {
  let component: OtherProfileComponent;
  let fixture: ComponentFixture<OtherProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OtherProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OtherProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
