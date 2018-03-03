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
  editMode: boolean = false;
  newWidget: any = null;

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

  runCallback(callback){
    callback();
  }
}

export interface Widget{
  update():void;
  getInvolvedDevices():string[];
}
