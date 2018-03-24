import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Location } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastComponent } from '../shared/toast/toast.component';
import { UtilService } from '../services/util.service';
import { ScheduleService } from '../services/schedule.service';
import { DeviceService } from '../services/device.service';
import { Schedule } from '../shared/schedule';

@Component({
  selector: 'add-schedule',
  templateUrl: './add-schedule.component.html',
  styleUrls: ['./add-schedule.component.scss']
})
export class AddScheduleComponent implements OnInit {

  schedules = [];
  scheduleType;
  sprinklers = [];
  devices = [];
  attributes = [];
  FIXED_DAILY: string = Schedule.FIXED_DAILY;
  FIXED_INTERVAL: string = Schedule.FIXED_INTERVAL;
  FLEXIBLE_DAILY: string = Schedule.FLEXIBLE_DAILY;

  constructor(
    private util: UtilService,
    private router: Router,
    public toast: ToastComponent,
    public scheduleService: ScheduleService,
    private deviceService: DeviceService
  ) { }

  ngOnInit() {
    if (!this.scheduleService.isEditting) {
      if (this.router.url === Schedule.EDIT_URL) {
        this.router.navigate([Schedule.SCHEDULE_URL]);
      }
      this.initializeSchedule();
      this.scheduleType = Schedule.FIXED_DAILY;
    }
    else {
      this.scheduleType = this.scheduleService.schedule.type;
    }
    this.getSprinklers();
    this.getSensors();
  }

  initializeSchedule() {
    this.scheduleService.schedule = {
      "content": {
        "sprinkler_name": ""
      },
      "name": "",
      "type": "none"
    }
  }

  getSprinklers() {
    this.deviceService.getSprinklers().subscribe(
      res => {
        this.sprinklers = res[0];
      },
      error => {
        this.toast.setMessage("Failed to get sprinkler list!", "danger");
      });
  }

  getSensors() {
    let vm = this;
    vm.deviceService.getSensors().subscribe(res => {
      let deviceList = [];
      res.forEach(array => {
        array.forEach(device => {
          deviceList.push(device);
        });
      });
      vm.devices = Object.create(deviceList);
    });
  }

  clearAll() {
    this.router.navigate([Schedule.SCHEDULE_URL]);
  }

  createSchedule() {
    this.scheduleService.createSchedule(this.scheduleService.schedule).subscribe(
      res => {
        this.toast.setMessage("Schedule created successfully.", "success");
        this.router.navigate(["schedule/"]);
      },
      error => {
        this.toast.setMessage("Failed to create schedule.", "danger");
      }
    )
  }

  updateSchedule() {
    this.scheduleService.updateSchedule(this.scheduleService.schedule).subscribe(
      res => {
        this.toast.setMessage("Schedule updated successfully.", "success");
        this.scheduleService.isEditting = false;
        this.initializeSchedule();
        this.router.navigate([Schedule.SCHEDULE_URL]);
      },
      error => {
        this.scheduleService.isEditting = false;
        this.toast.setMessage("Failed to update schedule.", "danger");
      }
    )
  }
}
