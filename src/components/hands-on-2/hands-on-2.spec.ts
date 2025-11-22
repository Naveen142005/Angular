import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HandsOn2 } from './hands-on-2';

describe('HandsOn2', () => {
  let component: HandsOn2;
  let fixture: ComponentFixture<HandsOn2>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HandsOn2]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HandsOn2);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
