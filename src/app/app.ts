import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BookList } from '../components/book-list/book-list';
import { AddBook } from '../components/add-book/add-book';
import { ViewBook } from '../components/view-book/view-book';
import { hover } from '../directives/hover.directives';
import { FilterPipe } from '../pipes/filter-pipe';
import { CommonModule, JsonPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-root',
    imports: [BookList, ViewBook, hover, FilterPipe, JsonPipe, CommonModule, FormsModule],
    templateUrl: './app.html',
    styleUrl: './app.css',
})
export class App {
    bookId = 1;
    getbook: any = '';

    book_list = [
        { id: 1, title: 'Good book', author: 'Naveen' },
        { id: 2, title: 'Bad book', author: 'Thigalzhi' },
        { id: 3, title: 'Excellent book', author: 'Kumar' },
    ];

    search: any;

    ngOnInit() {
        console.log(this.bookId);
    }

    fun(e: any) {
        this.getbook = this.book_list.filter((item) => item.id == e)[0];
        console.log(this.getbook);
        console.log(e);
    }

    makeChangeinbook(e: any) {
        const isEdit = e.isEdit;
        const id = e.id;
        let bookIndex = this.book_list.findIndex((book) => book.id == id);
        if (bookIndex != -1) {
            if (isEdit) {
                if (e.title) this.book_list[bookIndex].title = e.title;
                if (e.author) this.book_list[bookIndex].author = e.author;
            } else {
                this.book_list.splice(bookIndex, 1);
            }
        } else {
            alert('Book not found');
        }
    }
}
