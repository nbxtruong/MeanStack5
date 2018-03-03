import { TestBed, inject } from '@angular/core/testing';

import { AppMqttService } from './app-mqtt.service';

describe('MqttService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AppMqttService]
    });
  });

  it('should be created', inject([AppMqttService], (service: AppMqttService) => {
    expect(service).toBeTruthy();
  }));
});
