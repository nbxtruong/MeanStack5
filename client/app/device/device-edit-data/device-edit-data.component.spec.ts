import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceEditDataComponent } from './device-edit-data.component';

describe('DeviceEditDataComponent', () => {
  let component: DeviceEditDataComponent;
  let fixture: ComponentFixture<DeviceEditDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeviceEditDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeviceEditDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
