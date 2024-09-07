import { TestBed } from '@angular/core/testing';

import { NgxImageSplitterService } from './ngx-image-splitter.service';

describe('NgxImageSplitterService', () => {
  let service: NgxImageSplitterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgxImageSplitterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
