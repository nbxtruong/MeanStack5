import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LinechartFormComponent } from './linechart-form.component';

describe('LinechartFormComponent', () => {
  let component: LinechartFormComponent;
  let fixture: ComponentFixture<LinechartFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LinechartFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LinechartFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
