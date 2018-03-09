import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GaugeSeriesComponent } from './gauge-series.component';

describe('GaugeSeriesComponent', () => {
  let component: GaugeSeriesComponent;
  let fixture: ComponentFixture<GaugeSeriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GaugeSeriesComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GaugeSeriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
