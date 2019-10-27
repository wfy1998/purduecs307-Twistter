import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FinduserComponent } from './finduser.component';

describe('FinduserComponent', () => {
  let component: FinduserComponent;
  let fixture: ComponentFixture<FinduserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FinduserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinduserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
