import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { Device } from '../shared/models/device.model';
import { UtilService } from './util.service';
import { AppHttpClient } from './app-http.service';

@Injectable()
export class DeviceService {

  constructor(
    private http: AppHttpClient,
    private util: UtilService
  ) { }

  getListDevices(): Observable<Device[]> {
    return this.http.get('devices');
  }

  getDeviceInfo(device_id: String): Observable<Device> {
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
}
