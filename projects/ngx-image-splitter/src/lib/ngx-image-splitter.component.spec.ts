import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxImageSplitterComponent } from './ngx-image-splitter.component';

describe('NgxImageSplitterComponent', () => {
  let component: NgxImageSplitterComponent;
  let fixture: ComponentFixture<NgxImageSplitterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgxImageSplitterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NgxImageSplitterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
