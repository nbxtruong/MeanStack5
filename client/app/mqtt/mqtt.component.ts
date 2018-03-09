import { Component, OnInit } from '@angular/core';
import { AppMqttService } from '../services/app-mqtt.service';
import * as mqtt from 'mqtt';

@Component({
  selector: 'app-mqtt',
  templateUrl: './mqtt.component.html',
  styleUrls: ['./mqtt.component.scss']
})
export class MqttComponent implements OnInit {
  ngOnInit(): void {
    this.mqtt.connect();
  }

  constructor(
    private mqtt: AppMqttService,
  ) { }

}
