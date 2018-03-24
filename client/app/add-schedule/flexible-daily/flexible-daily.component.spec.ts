import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlexibleDailyComponent } from './flexible-daily.component';

describe('FlexibleDailyComponent', () => {
  let component: FlexibleDailyComponent;
  let fixture: ComponentFixture<FlexibleDailyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlexibleDailyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlexibleDailyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
