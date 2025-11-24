import { Component, ViewContainerRef, ComponentRef } from '@angular/core';
import { AlertComponent } from './alert-component/alert-component';
import { BookDetailsComponent } from './book-details';




@Component({
  selector: 'app-dynamic-host',
  template: ``
})
export class DynamicHostComponent {
  private ref: ComponentRef<any> | null = null;

  constructor(private vcr: ViewContainerRef) {}

  createAlert() {
    this.vcr.clear();
    this.ref = this.vcr.createComponent(AlertComponent);
  }

  openBookDetails(book: any) {
    this.vcr.clear();
    this.ref = this.vcr.createComponent(BookDetailsComponent);
    this.ref.instance.book = book;
  }

  close() {
    if (this.ref) {
      this.ref.destroy();
      this.ref = null;
    }
  }
}
