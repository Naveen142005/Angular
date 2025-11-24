import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BookService } from '../services/book_list';


@Component({
  selector: 'app-edit-book',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  template: `
    <h2>Edit Book</h2>
    <form *ngIf="bookForm" [formGroup]="bookForm" (ngSubmit)="onSubmit()">
      <label>Title</label>
      <input formControlName="title" /><br />
      <label>Author</label>
      <input formControlName="author" /><br />
      <label>Price</label>
      <input formControlName="price" type="number" /><br />
      <button type="submit" [disabled]="bookForm.invalid">Save</button>
    </form>
  `,
})
export class newEditBookComponent implements OnInit {
  bookForm!: FormGroup;
  bookId!: number;

  constructor(
    private route: ActivatedRoute,
    private bookService: BookService,
    private router: Router
  ) {}

  ngOnInit() {
    this.bookId = Number(this.route.snapshot.paramMap.get('id'));
    const book = this.bookService.getBookById(this.bookId);
    if (book) {
      this.bookForm = new FormGroup({
        title: new FormControl(book.title, Validators.required),
        author: new FormControl(book.author, Validators.required),
        price: new FormControl(book.price, [Validators.required, Validators.min(0)]),
      });
    } else {
      // book not found, navigate to list
      this.router.navigate(['/books']);
    }
  }

  onSubmit() {
    if (this.bookForm.valid) {
      const books = this.bookService.book_list();
      const index = books.findIndex(b => b.id === this.bookId);
      if (index !== -1) {
        const updated = [...books];
        updated[index] = { id: this.bookId, ...this.bookForm.value };
        this.bookService.book_list.set(updated);
      }
      this.router.navigate(['/books']);
    }
  }
}
