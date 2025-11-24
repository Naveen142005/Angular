import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { BookService } from '../services/book_list';


@Component({
  selector: 'app-add-book',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <h2>Add Book</h2>
    <form [formGroup]="bookForm" (ngSubmit)="onSubmit()">
      <label>Title</label>
      <input formControlName="title" /><br />
      <label>Author</label>
      <input formControlName="author" /><br />
      <label>Price</label>
      <input formControlName="price" type="number" /><br />
      <button type="submit" [disabled]="bookForm.invalid">Add</button>
    </form>
  `,
})
export class newAddBookComponent {
  bookForm = new FormGroup({
    title: new FormControl('', Validators.required),
    author: new FormControl('', Validators.required),
    price: new FormControl(0, [Validators.required, Validators.min(0)]),
  });

  constructor(private bookService: BookService, private router: Router) {}

  onSubmit() {
    if (this.bookForm.valid) {
      const newBook = {
        id: Date.now(),
        ...this.bookForm.value,
      };
      this.bookService.addBook(newBook);
      this.router.navigate(['/books']);
    }
  }
}
