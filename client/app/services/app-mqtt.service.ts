import { Injectable, NgModule } from '@angular/core';
import * as mqtt from 'mqtt';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { Widget, UtilService } from './util.service';
import { AppHttpClient } from './app-http.service';
import { environment } from '../../environments/environment';
import { constants } from '../constants'

@Injectable()
export class AppMqttService {

  constructor(
    private http: AppHttpClient,
    private util: UtilService
  ) { }

  topicAndWidgetMap: Map<string, Widget[]> = new Map();

  client = null;

  getUpdateTopic(deviceId: string) {
    return constants.topicPrefixed + "/devices/" + deviceId + "/update";
  }

  getControlTopic(deviceId: string) {
    return constants.topicPrefixed + "/devices/" + deviceId + "/control";
  }

  getPresignedUrl(): Observable<any> {
    return this.http.get("presignedURL");
  }

  publish(topic: any, message: any) {
    if (this.client != null) {
      this.client.publish(topic, message);
    }
    else {
      console.log("mqtt is not ready");
    }
  }

  subscribe(topic: any, widget) {
    if (!this.topicAndWidgetMap.has(topic)) {
      this.topicAndWidgetMap.set(topic, [widget]);
    }
    else if (!this.topicAndWidgetMap.get(topic).includes(widget))
      this.topicAndWidgetMap.get(topic).push(widget);
    if (this.client != null) {
      this.client.subscribe(topic);
    } else {
      console.log("mqtt is not ready");
    }
  }

  connect() {
    this.getPresignedUrl()
      .subscribe(
        response => {
          this.client = mqtt.connect(response.url);
          this.client.on('connect', () => {
            console.log('Connected to AWS IoT Broker');
            let count = 0;
            this.topicAndWidgetMap.forEach((value, key) => {
              this.client.subscribe(key);
              count += value.length;
            })
            console.log(count + " widgets reconnected");
          });
          this.client.on('close', () => {
            console.log('Connection to AWS IoT Broker closed');
            this.client.end();
            this.client = null;
            this.connect();
            console.log('Reconnecting to AWS IoT Broker');
          });
          this.client.on('message', (topic, message) => {
            this.topicAndWidgetMap.get(topic).forEach((widget) => {
              widget.update(message);
            });
          });
        },
        error => {
          console.log(error);
        })
  }
}
