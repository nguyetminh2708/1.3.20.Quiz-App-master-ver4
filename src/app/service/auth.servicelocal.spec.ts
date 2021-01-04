import { TestBed } from '@angular/core/testing';

import { AuthServiceLocal } from './auth.servicelocal';

describe('AuthServiceLocal', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AuthServiceLocal = TestBed.get(AuthServiceLocal);
    expect(service).toBeTruthy();
  });
});
