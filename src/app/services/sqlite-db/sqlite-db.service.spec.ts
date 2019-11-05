import { TestBed } from '@angular/core/testing';

import { SqliteDBService } from './sqlite-db.service';

describe('SqliteDBService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SqliteDBService = TestBed.get(SqliteDBService);
    expect(service).toBeTruthy();
  });
});
