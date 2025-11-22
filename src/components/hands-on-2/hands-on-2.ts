import { AddBook } from "../add-book/add-book"
import { BookList } from "../book-list/book-list";
import { Component, computed } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule, JsonPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ViewBook } from '../view-book/view-book';
import { FilterPipe } from '../../pipes/filter-pipe';
import { hover } from '../../directives/hover.directives';
import { appHighlight } from "../../directives/appHighlight.directives";
import { BookService } from '../../services/book_list';
import { isAdmin } from "../../directives/appIfAdmin.directives";
import { pricedirec } from "../../directives/appPriceColor.directives";

@Component({
  selector: 'app-hands-on-2',
  imports: [BookList, ViewBook, hover, FilterPipe, JsonPipe, CommonModule, FormsModule, appHighlight, isAdmin, pricedirec],
  templateUrl: './hands-on-2.html',
  styleUrl: './hands-on-2.css',
})
export class HandsOn2 {
  bookId = 1;
  getbook: any = '';
  book_list: any;
  total_books: any = computed(() => this.bookService.book_list().length)

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

  


    is_admin : boolean = false
}
