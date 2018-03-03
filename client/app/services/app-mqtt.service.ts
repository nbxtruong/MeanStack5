import { Injectable, NgModule } from '@angular/core';
import * as mqtt from 'mqtt';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { Widget } from './util.service';

@Injectable()
export class AppMqttService {

  constructor(
    private http: HttpClient,
  ) { }

  topicAndWidgetMap: Map<string, Widget[]> = new Map();

  client = null;

  getUpdateTopic(deviceId: string) {
    return "ss/devices/" + deviceId + "/update";
  }

  getPresignedUrl(): Observable<any> {
    return this.http.get("http://localhost:3000");
  }

  publish(topic: any, message: any) {
    this.client.publish(topic, message);
  }

  subscribe(topic: any, widget) {
    this.client.subscribe(topic);
    if (!this.topicAndWidgetMap.has(topic)) {
      this.topicAndWidgetMap.set(topic, [widget]);
    }
    else
      this.topicAndWidgetMap.get(topic).push(widget);
  }

  connect() {
    this.getPresignedUrl()
      .subscribe(
      response => {
        console.log(response.url);
        this.client = mqtt.connect(response.url);
        this.client.on('connect', () => {
          console.log('Connected to AWS IoT Broker');
          this.client.subscribe("message");
        });
        this.client.on('close', () => {
          console.log('Connection to AWS IoT Broker closed');
          this.client.end();
          this.client = null;
        });
        this.client.on('message', (topic, message) => {
          this.topicAndWidgetMap.get(topic).forEach((widget) => {
            widget.update();
          });
        });
      },
      error => {
        console.log(error);
      })
  }
}
