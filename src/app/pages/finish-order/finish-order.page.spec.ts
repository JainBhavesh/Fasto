import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FinishOrderPage } from './finish-order.page';

describe('FinishOrderPage', () => {
  let component: FinishOrderPage;
  let fixture: ComponentFixture<FinishOrderPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FinishOrderPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinishOrderPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
