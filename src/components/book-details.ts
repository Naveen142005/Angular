import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-book-details',
  template: `
    <div *ngIf="book" class="book-details p-4 border rounded-md">
      <h2>{{ book.title }}</h2>
      <p><strong>Author:</strong> {{ book.author }}</p>
      <p><strong>Price:</strong> {{ book.price }}</p>
      <p><strong>Publisher:</strong> {{ book.publisher?.name }}</p>
    </div>
  `,
  standalone: true,
})
export class BookDetailsComponent {
  @Input() book: any;
}
