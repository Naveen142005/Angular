import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-alert-component',
  imports: [],
   template: `<br>
    <div class="p-3 rounded text-black bg-green-400 w-fit">
      {{ message }}
    </div>
    <br>
  `
})

export class AlertComponent {
  @Input() message!: string;
}
