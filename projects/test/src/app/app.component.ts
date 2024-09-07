import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgxImageSplitterDirective } from 'ngx-image-splitter';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NgxImageSplitterDirective],
  styleUrl: './app.component.scss',
  template: `
    <div class="main_container">
      <div
        NgxImageSplitter
        [imgSrc1]="
          'https://cdn.pixabay.com/photo/2023/10/07/14/24/smartwatch-8300238_1280.jpg'
        "
        [imgSrc2]="
          'https://cdn.pixabay.com/photo/2024/03/13/19/06/ai-generated-8631634_1280.jpg'
        "
      ></div>
    </div>
  `,
})
export class AppComponent {
  title = 'test';
}
