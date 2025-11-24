import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class BookService {
	book_list = signal([
		{ id: 1, title: 'Good book', author: 'Naveen' , price: 1000},
		{ id: 2, title: 'Bad book', author: 'Thigalzhi' , price: 400},
		{ id: 3, title: 'Excellent book', author: 'Kumar' , price: 300},
	]);

	addBook(book: any) {
		this.book_list.update((books) => [...books, book]);
	}
	
	 getBookById(id: number) {
		const books = this.book_list();
		return books.find(book => book.id === id) || null;
	 }
}
