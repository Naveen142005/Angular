import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CounterService {
  private countSubject = new BehaviorSubject<number>(0);
  count$ = this.countSubject.asObservable();

  increment() {
    this.countSubject.next(this.countSubject.value + 1);
    console.log('Count incremented to:', this.countSubject.value);
  }

  reset() {
    this.countSubject.next(0);
    console.log('Count reset to 0');
  }

  getCount() {
    return this.countSubject.value;
  }
}
