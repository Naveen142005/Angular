import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Handson1 } from './handson-1';

describe('Handson1', () => {
  let component: Handson1;
  let fixture: ComponentFixture<Handson1>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Handson1]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Handson1);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
