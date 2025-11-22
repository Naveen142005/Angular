import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule, JsonPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BookList } from '../book-list/book-list';
import { ViewBook } from '../view-book/view-book';
import { FilterPipe } from '../../pipes/filter-pipe';
import { hover } from '../../directives/hover.directives';
import { appHighlight } from "../../directives/appHighlight.directives";
import { BookService } from '../../services/book_list';

@Component({
  selector: 'app-handson-1',
  imports: [BookList, ViewBook, hover, FilterPipe, JsonPipe, CommonModule, FormsModule],

  templateUrl: './handson-1.html',
  styleUrl: './handson-1.css',
})
export class Handson1 {
    bookId = 1;
    getbook: any = '';
    book_list: any;

    constructor(private bookService: BookService) {}

    search: any;

    ngOnInit() {
        this.book_list = this.bookService.book_list;
        console.log(this.bookId);
    }

    fun(e: any) {
        this.getbook = this.book_list().filter((item: any) => item.id == e)[0];
        console.log(this.getbook);
        console.log(e);
    }

    makeChangeinbook(e: any) {
        const isEdit = e.isEdit;
        const id = e.id;
        const books = this.book_list();
        let bookIndex = books.findIndex((book: any) => book.id == id);
        if (bookIndex != -1) {
            if (isEdit) {
                if (e.title) books[bookIndex].title = e.title;
                if (e.author) books[bookIndex].author = e.author;
                if (e.price) books[bookIndex].price = e.price
                this.bookService.book_list.set(books);
            } else {
                const updated = [...books]; 
                updated.splice(bookIndex, 1);
                this.bookService.book_list.set(updated);
            }
        } else {
            alert('Book not found');
        }
    }

}
