import { Directive, ElementRef, Output, EventEmitter, AfterViewInit } from '@angular/core';

@Directive({
  selector: '[appClickOutside]'
})
export class appClickOutside implements AfterViewInit {
  @Output() clickOutside = new EventEmitter<Event>();

  constructor(private el: ElementRef) {}

  ngAfterViewInit() {
    setTimeout(() => {
      document.addEventListener('click', this.onClickOutside.bind(this), true);
    }, 0);
  }

  onClickOutside(event: Event) {
    if (!this.el.nativeElement.contains(event.target)) {
      this.clickOutside.emit(event);
    }
  }
}
