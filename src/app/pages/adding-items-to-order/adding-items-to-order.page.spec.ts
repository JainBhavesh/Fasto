import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddingItemsToOrderPage } from './adding-items-to-order.page';

describe('AddingItemsToOrderPage', () => {
  let component: AddingItemsToOrderPage;
  let fixture: ComponentFixture<AddingItemsToOrderPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddingItemsToOrderPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddingItemsToOrderPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
