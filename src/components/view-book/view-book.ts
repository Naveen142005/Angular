import { JsonPipe, NgIf, NgClass, NgStyle } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { hover } from '../../directives/hover.directives';
import { FormsModule } from '@angular/forms';

@Component({
	selector: 'app-view-book',
	imports: [hover, FormsModule, NgStyle],
	templateUrl: './view-book.html',
	styleUrl: './view-book.css',
})
export class ViewBook {
	@Input() Viewed_book: { id: number; title: string; author: string } | undefined;

	@Output() bookId = new EventEmitter<any>();

	@Output() makeChange = new EventEmitter<any>();

	flag = false;
	editClicked: any = false;
	bookTitle: any;
	bookAuthor: any;

	fun(book_id: any) {
		this.flag = true;
		if (this.Viewed_book) {
			this.bookTitle = this.Viewed_book.title;
			this.bookAuthor = this.Viewed_book.author;
		}
		this.bookId.emit(book_id);
	}

	cls(ipt: any) {
		if (ipt.value.length == 0) {
			this.Viewed_book = undefined;
			this.flag = false;
		}
		
	}

	call(id: any, isEdit: boolean) {
		this.makeChange.emit({
			id: id,
			title: this.bookTitle,
			author: this.bookAuthor,
			isEdit: isEdit,
		});
	}
}
