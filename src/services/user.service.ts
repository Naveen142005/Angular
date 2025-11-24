import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay, retry, finalize, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private isLoading = false;

  constructor() {}

  getUsers(): Observable<any[]> {
    this.isLoading = true;
    // Simulate API call
    return of([
      { id: 1, name: 'User 1' },
      { id: 2, name: 'User 2' },
      { id: 3, name: 'User 3' }
    ]).pipe(
      delay(2000),
      retry(2),
      finalize(() => {
        this.isLoading = false;
        console.log('User fetch completed');
      }),
      catchError(() => {
        console.error('Failed to fetch users');
        return of([]);
      })
    );
  }

  isLoading$() {
    return this.isLoading;
  }
}
