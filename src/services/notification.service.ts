import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { timer } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private notificationSubject = new Subject<string>();
  notification$ = this.notificationSubject.asObservable();

  showNotification(message: string) {
    this.notificationSubject.next(message);
    // Auto-dismiss after 3 seconds
    timer(3000).subscribe(() => {
      this.notificationSubject.next('');
    });
  }
}
