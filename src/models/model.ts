
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class model {
  private container!: HTMLElement;

  open(html: string) {
    this.container = document.createElement('div');
    this.container.innerHTML = html;
    document.body.appendChild(this.container);
  }

  close() {
    if (this.container) document.body.removeChild(this.container);
  }
}
