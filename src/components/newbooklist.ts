import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';
import { BookService } from '../services/book_list';

@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <h2>Book List</h2>
    <ul>
      <li *ngFor="let book of bookService.book_list()">
        <a [routerLink]="['/edit', book.id]">{{ book.title }} by {{ book.author }}</a>
      </li>
    </ul>
  `,
})
export class newBookListComponent {
  constructor(public bookService: BookService) {}
}
