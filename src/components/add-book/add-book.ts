import { JsonPipe } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import {Form, FormsModule} from '@angular/forms'
@Component({
  selector: 'app-add-book',
  imports: [FormsModule, JsonPipe],
  templateUrl: './add-book.html',
  styleUrl: './add-book.css',
})

export class AddBook {
	book_name = ''
	author = ''

	@Output() newBook = new EventEmitter<Form>();

	OnSubmit(val:Form) {
	  this.newBook.emit(val)
	}

	// console.log(this.book_name , this.author)	
}
