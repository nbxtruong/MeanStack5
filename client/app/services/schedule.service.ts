import { Injectable } from '@angular/core';
import { UtilService } from './util.service';
import { of } from 'rxjs/observable/of';
import { Observable } from 'rxjs/Observable';
import { Schedule } from '../shared/schedule';
import { AppHttpClient } from './app-http.service';

@Injectable()
export class ScheduleService {

  schedule;
  isEditting = false;
  isValidSchedule = false;

  constructor(
    private util: UtilService,
    private http: AppHttpClient
  ) { }

  getSchedules(): Observable<any> {
    return this.http.get('schedules');
  }

  statusEnable(id: String): Observable<any> {
    return this.http.put('schedules/enable/' + id, null);
  }

  statusDisable(id: String): Observable<any> {
    return this.http.put('schedules/disable/' + id, null);
  }

  createSchedule(schedule): Observable<any> {
    return this.http.post("schedules", schedule);
  }

  updateSchedule(schedule): Observable<any> {
    return this.http.put("schedules/" + schedule.id, schedule);
  }

  deleteSchedule(scheduleId) {
    return this.http.delete("schedules/" + scheduleId);
  }

  validateSchedule() {
    if (this.schedule.type === Schedule.FIXED_DAILY) {
      return this.validateFixedDaily();
    }
    else if (this.schedule.type === Schedule.FIXED_INTERVAL) {
      return this.validateFixedInterval();
    }
    else {
      return this.validateFlexible();
    }
  }

  validateFixedDaily() {
    if (!this.daysIsEmpty() || !this.valvesIsEmpty() || !this.timeIsValid() || !this.nameIsEmpty() || !this.durationIsValid() || !this.sprinklerNameIsEmpty() || !this.sprinklerIdIsEmpty()) {
      this.isValidSchedule = false;
      return false;
    }
    this.isValidSchedule = true;
    return true;
  }

  validateFlexible() {
    if (!this.valvesIsEmpty() || !this.nameIsEmpty() || !this.sprinklerNameIsEmpty() || !this.sprinklerIdIsEmpty() || !this.conditionsIsValid() || !this.durationIsValid() || !this.skipWateringConditionIsValid()) {
      this.isValidSchedule = false;
      return false;
    }
    this.isValidSchedule = true;
    return true;
  }

  validateFixedInterval() {
    if (!this.valvesIsEmpty() || !this.nameIsEmpty() || !this.sprinklerNameIsEmpty() || !this.sprinklerIdIsEmpty() || !this.intervalIsValid() || !this.durationIsValid()) {
      this.isValidSchedule = false;
      return false;
    }
    this.isValidSchedule = true;
    return true;
  }

  intervalIsValid() {
    if (this.schedule.content.interval.value < 1) {
      this.isValidSchedule = false;
      return false;
    }
    return true;
  }

  conditionsIsValid() {
    if (this.schedule.content.conditions[0].device_id === "" || this.schedule.content.conditions[0].device_id === "Sensor" || this.schedule.content.conditions[0].device_id === null || this.schedule.content.conditions[0].value === "" || this.schedule.content.conditions[0].value === null) {
      this.isValidSchedule = false;
      return false;
    }
    return true;
  }

  skipWateringConditionIsValid() {
    if (this.schedule.content.is_skip_watering === true) {
      if (this.schedule.content.qpf < 1 || this.schedule.content.forecasting_cycle < 1 || this.schedule.content.sprinkler_id === "" || this.schedule.content.sprinkler_id === null || this.schedule.content.skip_value < 1 || this.schedule.content.skip_value === null) {
        this.isValidSchedule = false;
        return false;
      }
    }
    return true;
  }

  daysIsEmpty() {
    if (this.schedule.content.days.length < 1) {
      return false;
    }
    return true;
  }

  valvesIsEmpty() {

    if (this.schedule.content.sprinkler_attributes.length < 1) {
      return false;
    }
    return true;
  }

  timeIsValid() {
    if (this.schedule.content.time.hours < 0 || this.schedule.content.time.hours == "" || this.schedule.content.time.hours == null || this.schedule.content.time.minutes < 0 || this.schedule.content.time.minutes == "" || this.schedule.content.time.minutes == null) {
      return false;
    }
    return true;
  }

  nameIsEmpty() {
    if (this.schedule.name === "" || this.schedule.name === null) {
      this.isValidSchedule = false;
      return false;
    }
    return true;
  }

  durationIsValid() {
    if (this.schedule.content.duration < 0 || this.schedule.content.duration == null || this.schedule.content.duration == "") {

      return false;
    }
    return true;
  }

  sprinklerNameIsEmpty() {
    if (this.schedule.content.sprinkler_name == "" || this.schedule.content.sprinkler_name == null) {
      return false;
    }
    return true;
  }

  sprinklerIdIsEmpty() {
    if (this.schedule.content.sprinkler_id == "" || this.schedule.content.sprinkler_id == null) {
      return false;
    }
    return true;
  }

}
