import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { Device } from '../shared/models/device.model';
import { UtilService } from './util.service';

@Injectable()
export class DeviceService {

  constructor(
    private http: HttpClient,
    private util: UtilService
  ) { }

  // createHeader(authentication: String) {
  //   const options = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': '' + authentication + '' }) };
  //   return options;
  // }

  getListDevices(): Observable<Device[]> {
    //return this.http.get<Device[]>(this.API_URL + '/devices', this.createHeader(authentication));
    return of(this.util.MOCK_DATA);
  }

  getDeviceInfo(device_id: String): Observable<Device> {
    //return this.http.get<Device[]>(this.API_URL + '/devices/' + device_id, this.createHeader(authentication));
    return of(this.util.MOCK_DATA[0]);
  }

  softDeleteDevice(device_id: String): Observable<Device> {
    //return this.http.delete<Device[]>(this.API_URL + '/devices/' + device_id, this.createHeader(authentication));
    return of(this.util.MOCK_DATA[0]);
  }
}
