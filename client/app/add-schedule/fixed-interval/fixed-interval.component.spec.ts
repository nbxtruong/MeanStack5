import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FixedIntervalComponent } from './fixed-interval.component';

describe('FixedIntervalComponent', () => {
  let component: FixedIntervalComponent;
  let fixture: ComponentFixture<FixedIntervalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FixedIntervalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FixedIntervalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
