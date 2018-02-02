import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceEditPropertiesComponent } from './device-edit-properties.component';

describe('DeviceEditPropertiesComponent', () => {
  let component: DeviceEditPropertiesComponent;
  let fixture: ComponentFixture<DeviceEditPropertiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeviceEditPropertiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeviceEditPropertiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
