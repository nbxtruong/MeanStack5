import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FixedDailyComponent } from './fixed-daily.component';

describe('FixedDailyComponent', () => {
  let component: FixedDailyComponent;
  let fixture: ComponentFixture<FixedDailyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FixedDailyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FixedDailyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
