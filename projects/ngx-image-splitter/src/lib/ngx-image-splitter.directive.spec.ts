import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgxImageSplitterDirective } from './ngx-image-splitter.directive';
import { Component } from '@angular/core';

describe('NgxImageSplitterDirective', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgxImageSplitterDirective],
    }).compileComponents();

    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create an instance', () => {
    expect(component).toBeTruthy();
  });
});

@Component({
  template: `
    <div
      ngxImageSplitter
      [imgSrc1]="'https://example.com/image1.jpg'"
      [imgSrc2]="'https://example.com/image2.jpg'"
    ></div>
  `,
})
class TestComponent { }
