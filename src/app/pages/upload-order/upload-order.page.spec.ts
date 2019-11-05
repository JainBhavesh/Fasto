import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadOrderPage } from './upload-order.page';

describe('UploadOrderPage', () => {
  let component: UploadOrderPage;
  let fixture: ComponentFixture<UploadOrderPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadOrderPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadOrderPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
