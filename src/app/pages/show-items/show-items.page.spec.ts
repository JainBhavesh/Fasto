import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowItemsPage } from './show-items.page';

describe('ShowItemsPage', () => {
  let component: ShowItemsPage;
  let fixture: ComponentFixture<ShowItemsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowItemsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowItemsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
