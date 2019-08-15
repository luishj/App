import { TestBed } from '@angular/core/testing';

import { PlanilhaService } from './planilha.service';

describe('PlanilhaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PlanilhaService = TestBed.get(PlanilhaService);
    expect(service).toBeTruthy();
  });
});
