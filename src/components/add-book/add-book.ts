import { JsonPipe } from '@angular/common';
import { Component, EventEmitter, Output, ViewChild, ViewContainerRef } from '@angular/core';
import { Form, FormsModule } from '@angular/forms';
import { AlertComponent } from '../alert-component/alert-component';
@Component({
	selector: 'app-add-book',
	imports: [FormsModule, JsonPipe],
	templateUrl: './add-book.html',
	styleUrl: './add-book.css',
})
export class AddBook {
	book_name = '';
	author = '';

	@Output() newBook = new EventEmitter<Form>();

	OnSubmit(val: Form) {
		this.newBook.emit(val);
	}

	// console.log(this.book_name , this.author)

	@ViewChild('alertContainer', { read: ViewContainerRef })
	container!: ViewContainerRef;

	showAlert() {
		this.container.clear(); 

		const alertRef = this.container.createComponent(AlertComponent);

		alertRef.setInput('message', 'Book added successfully!');

		setTimeout(() => alertRef.destroy(), 2000);
	}
}
