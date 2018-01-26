import { Injectable } from '@angular/core';
import { Device } from '../shared/models/device.model';

@Injectable()
export class UtilService {

  constructor() { }

  currentPage: String;
  currentDevicePage: String;
  currentDevice: Device;
  API_URL = 'http://192.168.129.137:3000';
  MOCK_DATA = [
    new Device({
      id: "1111",
      type: "1",
      name: "Sprinkler 1111",
      battery: "50",
      firmware: "Ardruino",
      lastupdate: "1516955861"
    }), new Device({
      id: "2222",
      type: "1",
      name: "Sprinkler 2222",
      battery: "50",
      firmware: "Ardruino",
      lastupdate: "1516955861"
    }), new Device({
      id: "3333",
      type: "1",
      name: "Sprinkler 3333",
      battery: "50",
      firmware: "Ardruino",
      lastupdate: "1516955861"
    }), new Device({
      id: "4444",
      type: "1",
      name: "Sprinkler 4444",
      battery: "50",
      firmware: "Ardruino",
      lastupdate: "1516955861"
    })]

  timeConverter(timestamp): String {
    var a = new Date(timestamp * 1000);
    var months = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = a.getHours();
    var min = a.getMinutes();
    var sec = a.getSeconds();
    var time = date + '/' + month + '/' + year;
    return time;
  }

  setCurrentPage(currentPage) {
    this.currentPage = currentPage;
  }

  setCurrentDevicePage(currentDevicePage) {
    this.currentDevicePage = currentDevicePage;
  }

  setCurrentDevice(currentDevice: Device){
    this.currentDevice=currentDevice;
  }
}
