import { Component, signal, DestroyRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { of, interval, fromEvent, Observable, Subject, timer } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  delay,
  switchMap,
  debounceTime,
  filter,
  take,
  tap,
  takeUntil,
  finalize,
  catchError,
  retry,
} from 'rxjs/operators';
import { CounterService } from '../../services/counter.service';
import { NotificationService } from '../../services/notification.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-handson-3',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './handson-3.html',
  styleUrls: ['./handson-3.css'],
})
export class Handson3 {
  private destroyRef = inject(DestroyRef);
  
  data$ = of('Hello Async Pipe!').pipe(delay(2000));
  loading$ = of(true).pipe(delay(2000), switchMap(() => of(false)));

  cancelReq$ = new Subject<void>();

  clickCountValue = 0;
  click$ = fromEvent(document, 'click').pipe(
    takeUntilDestroyed(this.destroyRef)
  );

  count = signal(0);
  counterSig = signal(0);
  doubleCnt = signal(0);

  stream$ = interval(1000).pipe(take(5), tap(v => console.log('Task6:', v)));

  searchCtrl = new FormControl('');
  search$!: Observable<string>;

  searchCtrl2 = new FormControl('');
  search2$!: Observable<string | null>;

  users$!: Observable<any[]>;
  isLoading = false;

  cntServ$!: Observable<number>;
  noti$!: Observable<string | null>;

  intervalCount$ = interval(1000).pipe(
    takeUntilDestroyed(this.destroyRef)
  );

  clickCountSignal = signal(0);

  clickCount$ = fromEvent(document, 'click').pipe(
    tap(() => this.clickCountSignal.update(c => c + 1)),
    takeUntilDestroyed(this.destroyRef)
  );

  resetClicks$ = new Subject<void>();

  searchService$!: Observable<string>;

  loadingUser = signal(false);

  constructor(
    private cntServ: CounterService,
    private notiServ: NotificationService,
    private userServ: UserService
  ) {
    this.cntServ$ = this.cntServ.count$;
    this.noti$ = this.notiServ.notification$;
  }

  ngOnInit() {
    
    this.search$ = this.searchCtrl.valueChanges.pipe(
      filter((val): val is string => !!val && val.trim() !== ''),
      debounceTime(300),
      tap(val => console.log('Search:', val))
    );

    this.search2$ = this.searchCtrl2.valueChanges.pipe(debounceTime(500));

    this.stream$.subscribe();

    this.click$.subscribe(() => this.clickCountValue++);

    interval(1000).subscribe(() => this.doubleCnt.set(this.counterSig() * 2));

    this.users$ = of([]);

    this.clickCount$.subscribe();

    this.searchService$ = this.searchCtrl.valueChanges.pipe(
      filter((val): val is string => val !== null && val.trim().length > 0),
      debounceTime(300),
      switchMap(val => {
        return of(`Result for "${val}"`).pipe(delay(1000));
      }),
      tap(val => console.log('SearchService Result:', val))
    );

  }

  cancelReq() {
    this.cancelReq$.next();
    console.log('Request cancelled');
  }

  showNoti() {
    this.notiServ.showNotification('Hello from Noti Service!');
  }

  inc() {
    this.count.update(val => val + 1);
  }

  resetCnt() {
    this.count.set(0);
  }

  incServ() {
    this.cntServ.increment();
  }

  resetServ() {
    this.cntServ.reset();
  }

  incCounter() {
    this.counterSig.update(val => val + 1);
    this.doubleCnt.set(this.counterSig() * 2);
    this.notiServ.showNotification('Counter incremented!');
  }

  decCounter() {
    this.counterSig.update(val => val - 1);
    this.doubleCnt.set(this.counterSig() * 2);
    this.notiServ.showNotification('Counter decremented!');
  }

  resetCounterSig() {
    this.counterSig.set(0);
    this.doubleCnt.set(0);
  }

  resetClick() {
    this.clickCountValue = 0;
    this.clickCountSignal.set(0);
  }

  loadUsers() {
    this.isLoading = true;
    this.users$ = this.userServ.getUsers().pipe(
      retry(2),
      catchError(err => {
        console.error('Error loading users:', err);
        return of([]);
      }),
      finalize(() => (this.isLoading = false))
    );
  }
}
