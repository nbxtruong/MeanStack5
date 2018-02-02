import { Injectable } from '@angular/core';
import { Device } from '../shared/models/device.model';

@Injectable()
export class UtilService {

  constructor() { }

  currentPage: String;
  currentDevicePage: String;
  currentDevice: Device;
  MOCK_DATA = [
    new Device({
      id: "1111",
      type: "1",
      name: "Sprinkler 1111",
      battery: "50",
      firmware: "Ardruino",
      last_updated: "1516955861"
    }), new Device({
      id: "2222",
      type: "1",
      name: "Sprinkler 2222",
      battery: "50",
      firmware: "Ardruino",
      last_updated: "1516955861"
    }), new Device({
      id: "3333",
      type: "1",
      name: "Sprinkler 3333",
      battery: "50",
      firmware: "Ardruino",
      last_updated: "1516955861"
    }), new Device({
      id: "4444",
      type: "1",
      name: "Sprinkler 4444",
      battery: "50",
      firmware: "Ardruino",
      last_updated: "1516955861"
    })]

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
