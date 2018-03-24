import { Injectable } from '@angular/core';
import { Device } from '../shared/models/device.model';
import { of } from 'rxjs/observable/of';
import { FixedSchedule } from '../shared/schedule';
import { timestamp } from 'rxjs/operators/timestamp';
import { constants } from '../constants';

@Injectable()
export class UtilService {

  constructor() { }

  currentPage: String;
  currentDevicePage: String;
  currentDevice: Device;
  isLoading: boolean;
  editMode: boolean = false;
  newWidget: any = null;
  dashboards: Array<any> = [];
  recentDashboards: Array<{
    id: string,
    name: string,
    timestamp: number
  }> = [];

  getLocalDateTime(timestamp): String {
    let date = new Date(timestamp);
    return date.toLocaleDateString() + " " + date.getHours() + ":" + date.getMinutes();
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

  runCallback(callback) {
    callback();
  }

  addRecentDashboard(id: string, name: string) {
    let dashboard = {
      id: id,
      name: name,
      timestamp: new Date().getTime()
    }
    //Check if this dashboard is not exist in the recent ones
    let found = this.recentDashboards.find(x => { return x.id === id });
    if (!found) {
      this.recentDashboards.push(dashboard);
    } else {
      found.timestamp = new Date().getTime();
    }
  }

  removeRecentDashboard(id: string) {
    let found = this.recentDashboards.find(x => { return x.id === id });
    this.recentDashboards.splice(this.recentDashboards.indexOf(found), 1);
  }

  getShowedDashboards(): Array<{ id: string, name: string, timestamp: number }> {
    let dashboards = Array.from(this.recentDashboards);
    dashboards.sort((a, b) => { return b.timestamp - a.timestamp });
    this.saveRecentDashboard();
    return dashboards.splice(0, 3);
  }

  saveRecentDashboard() {
    localStorage.setItem(constants.localStorage.recent_dashboards, JSON.stringify(this.recentDashboards));
  }
}

export class Widget {
  update(message: any): void { };
  getInvolvedDevices(): string[] { return [] };
  getInvolvedGateways(): string[] { return [] };
  constructor() { };
}
