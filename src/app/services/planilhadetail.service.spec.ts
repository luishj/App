import { TestBed } from '@angular/core/testing';

import { PlanilhadetalheService } from './planilhadetail.service';

describe('PlanilhadetailService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PlanilhadetalheService = TestBed.get(PlanilhadetalheService);
    expect(service).toBeTruthy();
  });
});
