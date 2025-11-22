import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AddBook } from '../add-book/add-book';
import { BookService } from '../../services/book_list';

@Component({
  selector: 'app-book-list',
  imports: [CommonModule, AddBook],
  templateUrl: './book-list.html',
  styleUrl: './book-list.css',
})

export class BookList {
  book_list: any;
  ngOnInit() {
    this.book_list = this.bookService.book_list;
  }
  id = 4;
  
  constructor(private bookService: BookService) {}
  
  add_new(e: any) {
    console.log(e);
    console.log(typeof e);

    const newBook = {
      id: this.id++,
      title: e.book_name,
      author: e.author,
    };
    this.bookService.addBook(newBook);
  }
}
