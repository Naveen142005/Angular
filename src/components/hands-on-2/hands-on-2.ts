import { AddBook } from '../add-book/add-book';
import { BookList } from '../book-list/book-list';
import { Component, computed, effect, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule, JsonPipe } from '@angular/common';
import { FormArray, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ViewBook } from '../view-book/view-book';
import { FilterPipe } from '../../pipes/filter-pipe';
import { hover } from '../../directives/hover.directives';
import { appHighlight } from '../../directives/appHighlight.directives';
import { BookService } from '../../services/book_list';
import { isAdmin } from '../../directives/appIfAdmin.directives';
import { pricedirec } from '../../directives/appPriceColor.directives';
import { model } from '../../models/model';

@Component({
	selector: 'app-hands-on-2',
	imports: [
		BookList,
		ViewBook,
		hover,
		FilterPipe,
		JsonPipe,
		CommonModule,
		FormsModule,
		appHighlight,
		isAdmin,
		pricedirec,
        ReactiveFormsModule
	],
	templateUrl: './hands-on-2.html',
	styleUrl: './hands-on-2.css',
})
export class HandsOn2 {

	bookId = 1;
	getbook: any = '';
	book_list: any;
	total_books: any = computed(() => this.bookService.book_list().length);

	// constructor(private bookService: BookService, private m: model) {}

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

			const stauts_value = isEdit ? 'Updated' : 'Deleted';
			this.m.open(
				`
				<div id="overlay" style="position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.5);display:flex;justify-content:center;align-items:center;">
    <div style="background:white;padding:20px;border-radius:8px;">
        <h2 class="text-black">Book ${stauts_value}!</h2>
        <button onclick="document.getElementById('overlay').remove()" class="text-black">Close</button>
    </div>
</div>

`
			);
		} else {
			alert('Book not found');
		}
	}

	is_admin: boolean = false;
	bookForm: FormGroup;

	constructor(private bookService: BookService, private fb: FormBuilder, private m: model) {
		this.bookForm = this.fb.group({
			title: ['', Validators.required],
			author: ['', Validators.required],
			price: ['', [Validators.required, Validators.min(0)]],
			publisher: this.fb.group({ name: [''] }),
			tags: this.fb.array([]),
		});

		this.book_list = this.bookService.book_list;
		this.total_books = computed(() => this.book_list().length);
	}

	get tags() {
		return this.bookForm.get('tags') as FormArray;
	}

	addTag() {
		this.tags.push(new FormControl(''));
	}

	removeTag(i: number) {
		this.tags.removeAt(i);
	}

	resetForm() {
		this.bookForm.reset();
	}

	addBook(book: any) {
		const books = this.book_list();
		this.book_list.set([...books, book]);
	}
}

export class HandsOn2Signals {
	bookCount = signal(0);
	bookList = signal<any[]>([]);

	total_books = computed(() => this.bookList().length);

	constructor(private bookService: BookService) {
		this.bookList.set(this.bookService.book_list());
		effect(() => console.log('Book count changed:', this.total_books()));
	}

	addBook(book: any) {
		this.bookList.update((list) => [...list, book]);
		this.bookCount.set(this.bookCount() + 1);
	}
}
