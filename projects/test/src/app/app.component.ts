import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NgxImageSplitterDirective } from 'ngx-image-splitter';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, NgxImageSplitterDirective],
  styleUrl: './app.component.scss',
  template: `
    <h1>Image Splitter</h1>
    <p>Image Splitter is a directive that allows you to split an image into two parts and compare them.</p>
    
    <div class="main_container">
      <div
        NgxImageSplitter
        [imgSrc1]="'https://cdn.pixabay.com/photo/2023/10/07/14/24/smartwatch-8300238_1280.jpg'"
        [imgSrc2]="'https://cdn.pixabay.com/photo/2024/03/13/19/06/ai-generated-8631634_1280.jpg'"
      ></div>
    </div>
  `,
})
export class AppComponent {
  title = 'Image Splitter';
}
