import { Component, OnInit } from '@angular/core';
import { AppMqttService } from '../services/app-mqtt.service';
import * as mqtt from 'mqtt';

@Component({
  selector: 'app-mqtt',
  templateUrl: './mqtt.component.html',
  styleUrls: ['./mqtt.component.scss']
})
export class MqttComponent implements OnInit {

  constructor(
    private mqttService: AppMqttService
  ) { }

  LAST_WILL_TOPIC = 'last-will';
  MESSAGE_TOPIC = 'message';
  CLIENT_CONNECTED = 'client-connected';
  CLIENT_DISCONNECTED = 'client-disconnected';
  count = 0;

  ngOnInit() {
  }

  getNotification = (clientId, username) => JSON.stringify({ clientId, username });
  connect(clientId, username) {
    const options: any = {
      will: {
        topic: this.LAST_WILL_TOPIC,
        payload: this.getNotification(clientId, username),
      }
    };
    let client = null;
    this.mqttService.getPresignedUrl()
      .subscribe(
      response => {
        console.log(response.url);
        client = mqtt.connect(response.url);
        client.on('connect', () => {
          console.log('Connected to AWS IoT Broker');
          client.subscribe(this.MESSAGE_TOPIC);
          console.log('Subscribe to ' + this.MESSAGE_TOPIC);
          client.subscribe(this.CLIENT_CONNECTED);
          client.subscribe(this.CLIENT_DISCONNECTED);
          const connectNotification = this.getNotification(clientId, username);
          client.publish(this.CLIENT_CONNECTED, connectNotification);
          console.log('Public to message');
          setInterval(() => {
            client.publish('message', "testing");
            client.publish(this.CLIENT_CONNECTED, connectNotification);
          }, 1000);
        });
        client.on('close', () => {
          console.log('Connection to AWS IoT Broker closed');
          client.end();
        });
        client.on('message', (topic, message) => {
          console.log(message.toString());
        });
      },
      error => {
        console.log(error);
      })
  }
}
