import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Handson1 } from "../components/handson-1/handson-1";
import { Sidebar } from "../components/sidebar/sidebar";
import { BookService } from '../services/book_list';

@Component({
    selector: 'app-root',
    imports: [CommonModule, FormsModule, Sidebar, RouterOutlet],
    templateUrl: './app.html',
    styleUrl: './app.css',
})

export class App {
    // constructor(public bookService: BookService) {}
}
