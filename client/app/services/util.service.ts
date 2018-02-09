import { Injectable } from '@angular/core';
import { Device } from '../shared/models/device.model';
import { of } from 'rxjs/observable/of';

@Injectable()
export class UtilService {

  constructor() { }

  currentPage: String;
  currentDevicePage: String;
  currentDevice: Device;
  isLoading: boolean;

  getLocalDateTime(timestamp): String {
    let date = new Date(timestamp);
    return date.toLocaleDateString() + " - " + date.toLocaleTimeString();
  }

  setCurrentPage(currentPage) {
    this.currentPage = currentPage;
  }

  setCurrentDevicePage(currentDevicePage) {
    this.currentDevicePage = currentDevicePage;
  }

  setCurrentDevice(currentDevice: Device) {
    this.currentDevice = currentDevice;
  }
}
