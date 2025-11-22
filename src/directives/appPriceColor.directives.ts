import { Directive, ElementRef, Input, Renderer2 } from "@angular/core";

@Directive({
  selector: '[pricedirec]'
})
export class pricedirec {

  @Input() price: number = 0;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnChanges() {
    if (this.price > 500) {
      this.renderer.setStyle(this.el.nativeElement, 'color', 'red');

    } else {
      this.renderer.setStyle(this.el.nativeElement, 'color', 'green');
    }
  }
}
