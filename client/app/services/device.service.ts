import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { Router, ActivatedRoute } from '@angular/router';
import { ToastComponent } from '../shared/toast/toast.component';
import { environment } from '../../environments/environment';
import { Device } from '../shared/models/device.model';
import { UtilService } from './util.service';
import { AppHttpClient } from './app-http.service';

@Injectable()
export class DeviceService {
  apiUrl: String = environment.apiUrl;

  constructor(
    private router: Router,
    public toast: ToastComponent,
    private http: AppHttpClient,
    private util: UtilService
  ) { }

  getListDevices(): Observable<Device[]> {
    return this.http.get('devices');
  }

  updateDevice(device_id: String, device_data: Object): Observable<Device> {
    return this.http.put('devices/' + device_id, device_data);
  }

  getDevice(device_id: String): Observable<Device> {
    return this.http.get('devices/' + device_id);
  }

  deleteDevice(device_id: String): Observable<any> {
    return this.http.delete('devices/' + device_id);
  }

  deleteDevices(devicesID: String[]): Observable<any> {
    let deleteIDs: any[] = [];
    devicesID.forEach(deviceID => {
      deleteIDs.push({ "id": deviceID });
    });
    return this.http.post('devices/deleteByIds', deleteIDs);
  }

  getDeviceData(dataRequest: any): Observable<any> {
    return this.http.post("deviceData", dataRequest);
  }

  getSprinklers(): Observable<any> {
    let deviceTypes: any[] = ["Sprinkler"];
    return this.http.post("devices/getAttributes/", deviceTypes);
  }

  getSensors() {
    let deviceTypes: any[] = ["Sensor"];
    return this.http.post("devices/getAttributes/", deviceTypes);
  }

  getSingleDeviceData(request: any): Observable<any> {
    console.log(request);
    return this.http.post("deviceData/data", request);
  }
}
