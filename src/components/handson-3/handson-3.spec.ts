import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Handson3 } from './handson-3';
import { CounterService } from '../../services/counter.service';
import { NotificationService } from '../../services/notification.service';
import { UserService } from '../../services/user.service';
import { ReactiveFormsModule } from '@angular/forms';

describe('Handson3 - State Management', () => {
  let component: Handson3;
  let fixture: ComponentFixture<Handson3>;
  let cntServ: CounterService;
  let notiServ: NotificationService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Handson3, ReactiveFormsModule],
      providers: [CounterService, NotificationService, UserService],
    }).compileComponents();

    fixture = TestBed.createComponent(Handson3);
    component = fixture.componentInstance;
    cntServ = TestBed.inject(CounterService);
    notiServ = TestBed.inject(NotificationService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Task #1: should have data$ observable with delay', (done) => {
    component.data$.subscribe((value) => {
      expect(value).toBe('Hello Async Pipe!');
      done();
    });
  });

  it('Task #2: should show notification', (done) => {
    component.showNoti();
    component.noti$.subscribe((msg) => {
      if (msg) {
        expect(msg).toBe('Hello from Noti Service!');
        done();
      }
    });
  });

  it('Task #5: should increment signal counter', () => {
    expect(component.count()).toBe(0);
    component.inc();
    expect(component.count()).toBe(1);
  });

  it('Task #5: should reset signal counter', () => {
    component.count.set(5);
    component.resetCnt();
    expect(component.count()).toBe(0);
  });

  it('Task #7: should increment service counter', (done) => {
    component.incServ();
    component.cntServ$.subscribe((value) => {
      expect(value).toBeGreaterThan(0);
      done();
    });
  });

  it('Task #8: search should filter empty strings', () => {
    component.searchCtrl.setValue('');
    expect(component.searchCtrl.value).toBe('');
  });

  it('Task #11: should increment counter signal', () => {
    expect(component.counterSig()).toBe(0);
    component.incCounter();
    expect(component.counterSig()).toBe(1);
    expect(component.doubleCnt()).toBe(2);
  });

  it('Task #11: should decrement counter signal', () => {
    component.counterSig.set(5);
    component.decCounter();
    expect(component.counterSig()).toBe(4);
  });

  it('Task #11: should reset counter', () => {
    component.counterSig.set(10);
    component.resetCounterSig();
    expect(component.counterSig()).toBe(0);
    expect(component.doubleCnt()).toBe(0);
  });

  it('Task #4: should reset click count', () => {
    component.clickCountValue = 5;
    component.resetClick();
    expect(component.clickCountValue).toBe(0);
  });
});
 