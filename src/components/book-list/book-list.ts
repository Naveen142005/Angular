import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { AddBook } from '../add-book/add-book';
import { Form } from '@angular/forms';

@Component({
  selector: 'app-book-list',
  imports: [CommonModule, AddBook],
  templateUrl: './book-list.html',
  styleUrl: './book-list.css',
})
export class BookList {

  @Input() book_list: any[] = []
  id = 4;
  
  add_new(e: any) {
    console.log(e);
    console.log(typeof e);

    this.book_list.push({
      id: this.id++,
      title: e.book_name,
      author: e.author,
    });
  }
}
