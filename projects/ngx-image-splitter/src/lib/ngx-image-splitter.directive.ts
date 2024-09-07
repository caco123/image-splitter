import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  OnInit,
  Renderer2,
} from '@angular/core';

@Directive({
  selector: '[NgxImageSplitter]',
  standalone: true,
})
export class NgxImageSplitterDirective implements OnInit {
  @Input({ required: true }) imgSrc1!: string;
  @Input({ required: true }) imgSrc2!: string;

  private resizableGrabWidth: number;
  private capa: HTMLDivElement;
  private img: HTMLImageElement;
  private btnResize: HTMLButtonElement;
  private dragging: boolean;

  constructor(
    private resizableHtmlElement: ElementRef<HTMLElement>,
    private renderer: Renderer2
  ) {
    this.capa = this.renderer.createElement('div');
    this.btnResize = this.renderer.createElement('button');
    this.img = this.renderer.createElement('img');
    this.dragging = false;
    this.resizableGrabWidth = 2;
  }

  ngOnInit(): void {
    this.setParentBoxStyles();
    this.setBorderRight();
    this.setConfigStyles();
    this.setBtnStyles();
    this.setImgStyles();
    this.setDivStyles();
    this.setSectionEventListeners();
    this.setBtnEventListeners();
    this.appendsElements();
  }

  private appendsElements(): void {
    this.renderer.appendChild(this.capa, this.img);
    this.renderer.appendChild(this.capa, this.btnResize);
    this.renderer.appendChild(
      this.resizableHtmlElement.nativeElement,
      this.capa
    );
  }

  private setImgStyles() {
    this.renderer.setStyle(this.img, 'position', 'absolute');
    this.renderer.setStyle(this.img, 'left', '0');
    this.renderer.setStyle(this.img, 'top', '0');
    this.renderer.setStyle(this.img, 'width', '100vw');
    this.renderer.setAttribute(this.img, 'src', this.imgSrc1);
    this.renderer.setAttribute(this.img, 'title', '');
  }

  private setBtnStyles() {
    this.renderer.setStyle(this.btnResize, 'width', '50px');
    this.renderer.setStyle(this.btnResize, 'border', 'none');
    this.renderer.setStyle(this.btnResize, 'border-radius', '50%');
    this.renderer.setStyle(this.btnResize, 'background-color', 'black');
    this.renderer.setStyle(this.btnResize, 'color', 'white');
    this.renderer.setStyle(this.btnResize, 'position', 'fixed');
    this.renderer.setStyle(this.btnResize, 'right', '400px');
    this.renderer.setStyle(this.btnResize, 'left', 'calc(50% - 23px)');
    this.renderer.setStyle(this.btnResize, 'aspect-ratio', '1 / 1');
    this.renderer.setAttribute(this.btnResize, 'type', 'button');
    this.renderer.setProperty(this.btnResize, 'innerText', '< >');
  }

  private setDivStyles() {
    this.renderer.setStyle(this.capa, 'height', '100%');
    this.renderer.setStyle(this.capa, 'background-color', 'rgba(0, 0, 0, 0.5)');
    this.renderer.setStyle(this.capa, 'background-repeat', 'no-repeat');
    this.renderer.setStyle(this.capa, 'display', 'flex');
    this.renderer.setStyle(this.capa, 'overflow', 'hidden');
    this.renderer.setStyle(this.capa, 'justify-content', 'center');
    this.renderer.setStyle(this.capa, 'align-items', 'center');
    this.renderer.setStyle(this.capa, 'position', 'relative');
  }

  private setSectionEventListeners() {
    this.renderer.listen(
      this.resizableHtmlElement.nativeElement,
      'mousedown',
      (event: MouseEvent) => this.mouseDown(event)
    );

    this.renderer.listen(
      this.resizableHtmlElement.nativeElement,
      'mouseup',
      () => this.mouseUp()
    );
  }

  private setBtnEventListeners() {
    this.renderer.listen(
      this.resizableHtmlElement.nativeElement,
      'mousedown',
      () => this.btnMouseDown()
    );

    this.renderer.listen(
      this.resizableHtmlElement.nativeElement,
      'mouseup',
      () => this.mouseUp()
    );
  }

  @HostListener('mousemove', ['$event'])
  mouseMove(evt: MouseEvent) {
    if (this.dragging) {
      this.updateWidth(evt);
    } else {
      this.inDragRegion(evt);
    }
  }

  private mouseUp() {
    if (!this.dragging) return;
    this.setBorderRight();
    this.dragging = false;
  }

  private mouseDown(evt: MouseEvent) {
    if (this.inDragRegion(evt)) {
      this.dragging = true;
      this.defineCursorColResize();
      this.setHoverBorderRight();
    }
  }

  private btnMouseDown() {
    this.dragging = true;
    this.defineCursorColResize();
    this.setHoverBorderRight();
  }

  private defineCursorColResize() {
    this.renderer.setStyle(this.capa, 'cursor', 'col-resize');
  }

  private defineCursorDefault() {
    this.renderer.setStyle(this.capa, 'cursor', 'default');
  }

  private updateWidth(evt: MouseEvent) {
    this.renderer.setStyle(this.capa, 'width', evt.x + 'px');
    this.renderer.setStyle(this.btnResize, 'left', evt.x - 23 + 'px');
  }

  private inDragRegion(evt: MouseEvent): boolean {
    const inside =
      this.capa.clientWidth - evt.clientX + this.capa.offsetLeft <
      this.resizableGrabWidth;

    if (inside) {
      this.defineCursorColResize();
    } else {
      this.defineCursorDefault();
    }
    return inside;
  }

  private setHoverBorderRight(): void {
    const css_HoverBorderRight = this.resizableGrabWidth + 'px solid #808080';
    this.renderer.setStyle(this.capa, 'border-right', css_HoverBorderRight);
  }

  private setBorderRight(): void {
    const css_borderRight = this.resizableGrabWidth + 'px solid #818181';
    this.renderer.setStyle(this.capa, 'border-right', css_borderRight);
  }

  private setConfigStyles(): void {
    this.renderer.setStyle(this.capa, 'width', '50%');
  }

  /* 

#directive {
  background-image: url("../../../assets/imgs/edificio-1.jpeg");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: top;
  transform: scale(1);
  overflow: hidden;
  height: 100vh;

  scroll-snap-align: end;
  scroll-snap-stop: always;
  img {
    height: 100%;
  }
}

ul > li {
  font-size: 1.5rem;
  color: white;
  margin: 1rem;
}

*/

  private setParentBoxStyles() {
    this.renderer.setStyle(
      this.resizableHtmlElement.nativeElement,
      'background-image',
      `url('${this.imgSrc2}')`
    );
    this.renderer.setStyle(
      this.resizableHtmlElement.nativeElement,
      'background-repeat',
      'no-repeat'
    );
    this.renderer.setStyle(
      this.resizableHtmlElement.nativeElement,
      'background-size',
      'cover'
    );
    this.renderer.setStyle(
      this.resizableHtmlElement.nativeElement,
      'background-position',
      'top'
    );
    this.renderer.setStyle(
      this.resizableHtmlElement.nativeElement,
      'transform',
      'scale(1)'
    );
    this.renderer.setStyle(
      this.resizableHtmlElement.nativeElement,
      'overflow',
      'hidden'
    );
    this.renderer.setStyle(
      this.resizableHtmlElement.nativeElement,
      'height',
      '100vh'
    );
  }
}
