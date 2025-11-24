import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { BookService } from '../services/book_list';

@Injectable({ providedIn: 'root' })
export class BookResolver implements Resolve<any> {
  constructor(private bookService: BookService) {}

  resolve(route: ActivatedRouteSnapshot): any {
    const id = route.params['id'];
    return this.bookService.getBookById(id);
  }
}
