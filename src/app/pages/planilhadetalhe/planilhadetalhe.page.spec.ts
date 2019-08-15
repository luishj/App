import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanilhadetalhePage } from './planilhadetalhe.page';

describe('PlanilhadetalhePage', () => {
  let component: PlanilhadetalhePage;
  let fixture: ComponentFixture<PlanilhadetalhePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlanilhadetalhePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanilhadetalhePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
