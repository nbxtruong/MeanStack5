import { Injectable } from '@angular/core';
import { Device } from '../shared/models/device.model';

@Injectable()
export class UtilService {

  constructor() { }

  currentPage: String;
  currentDevicePage: String;
  private currentDeviceID: String;
  API_URL = 'http://192.168.129.137:3000';
  MOCK_DATA = [
    new Device({
      id: '1111',
      type: '1',
      name: 'Sprinkler 1111',
      battery: '50',
      firmware: 'Ardruino',
      lastupdate: '1516955861'
    }), new Device({
      id: '2222',
      type: '1',
      name: 'Sprinkler 2222',
      battery: '50',
      firmware: 'Ardruino',
      lastupdate: '1516955861'
    }), new Device({
      id: '3333',
      type: '1',
      name: 'Sprinkler 3333',
      battery: '50',
      firmware: 'Ardruino',
      lastupdate: '1516955861'
    }), new Device({
      id: '4444',
      type: '1',
      name: 'Sprinkler 4444',
      battery: '50',
      firmware: 'Ardruino',
      lastupdate: '1516955861'
    })];

  timeConverter(timestamp): String {
    const a = new Date(timestamp * 1000);
    const months = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
    const year = a.getFullYear();
    const month = months[a.getMonth()];
    const date = a.getDate();
    const hour = a.getHours();
    const min = a.getMinutes();
    const sec = a.getSeconds();
    const time = date + '/' + month + '/' + year;
    return time;
  }

  getCurrentPage() {
    return this.currentPage;
  }

  setCurrentPage(currentPage) {
    this.currentPage = currentPage;
  }

  getCurrentDevicePage() {
    return this.currentDevicePage;
  }

  setCurrentDevicePage(currentDevicePage) {
    this.currentDevicePage = currentDevicePage;
  }

  getCurrentDeviceID() {
    return this.currentDeviceID;
  }

  setCurrentDeviceID(currentDeviceID: String) {
    this.currentDeviceID = currentDeviceID;
  }
}
