import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges, OnChanges } from '@angular/core';
import { UtilService } from '../../services/util.service';
import { DeviceService } from '../../services/device.service';
import { Schedule } from '../../shared/schedule';
import { AmazingTimePickerService } from 'amazing-time-picker';
import { ToastComponent } from '../../shared/toast/toast.component';
import { ScheduleService } from '../../services/schedule.service';

@Component({
  selector: 'fixed-interval',
  templateUrl: './fixed-interval.component.html',
  styleUrls: ['./fixed-interval.component.scss']
})
export class FixedIntervalComponent implements OnInit {

  @Input('schedule') schedule: any;
  @Input('sprinklers') sprinklers: any;
  days = [];
  time;
  duration;
  sprinkler_attributes = [];
  valves = [];
  selectedSprinkler: any;
  intervalTimeType: any;
  intervalTime: any;
  intervalDuration: any;

  constructor(
    private util: UtilService,
    private deviceService: DeviceService,
    private toast: ToastComponent,
    private scheduleService: ScheduleService
  ) { }

  ngOnChanges(changes: SimpleChanges) {
    if (this.scheduleService.isEditting) {
      if (changes.schedule != undefined) {
        this.selectedSprinkler = this.schedule.content.sprinkler_id;
      }
      if (changes.sprinklers != undefined) {

        this.setValveList();
      }
    }
  }

  ngOnInit() {
    if (this.schedule.type != Schedule.FIXED_INTERVAL) {
      this.initializeFixedIntervalSchedule();
      this.time = "";
      this.selectedSprinkler = "Sprinkler";
      this.intervalTime = "0";
      this.selectedSprinkler = "Sprinkler";
      this.duration = 0;
      this.intervalTimeType = "minutes";
    }
    else {
      this.intervalTime = this.schedule.content.interval.value;
      this.intervalTimeType = this.schedule.content.interval.type;
    }
  }

  ngOnDestroy() {
    this.scheduleService.schedule.name = "";
    this.scheduleService.isValidSchedule = false;
  }

  initializeFixedIntervalSchedule() {
    this.schedule = {
      "content": {
        "sprinkler_name": ""
      },
      "name": ""
    }
    this.schedule.content.duration = 1;
    this.schedule.content.sprinkler_attributes = [];
    this.schedule.content.sprinkler_name = "";
    this.schedule.type = "Fixed Interval";

    this.scheduleService.schedule = this.schedule;
    this.scheduleService.validateSchedule();
  }

  setValveList() {
    if (this.selectedSprinkler != undefined && this.sprinklers != undefined) {
      let l = this.sprinklers.find(x => x.id === this.selectedSprinkler);
      if (l === undefined) {
        return;
      }
      this.schedule.content.sprinkler_id = l.id;
      this.schedule.content.sprinkler_name = l.name;
      let addCheckedAttributes = [];

      this.sprinklers.forEach(sprinkler => {
        if (sprinkler.id === this.selectedSprinkler) {
          sprinkler.attributes.forEach(attribute => {
            attribute.selected = 0;
            addCheckedAttributes.push(attribute);
          });
        }
      });
      this.valves = addCheckedAttributes;
      this.schedule.content.sprinkler_attributes.forEach(attribute => {
        for (let i = 0; i < this.valves.length; i++) {
          if (attribute === this.valves[i].name) {
            this.valves[i].selected = !this.valves[i].selected;
          }
        }
      });

      this.scheduleService.schedule = this.schedule;
      this.scheduleService.validateSchedule();
    }
  }

  setValve(_valve) {
    let idx = this.valves.indexOf(_valve);
    this.valves[idx].selected = 1 - this.valves[idx].selected;
    let attributes = [];
    attributes = this.schedule.content.sprinkler_attributes;
    let valveDisabled = false;
    for (let i = 0; i < attributes.length; i++) {
      if ((<String>attributes[i]).match(_valve.name)) {
        attributes.splice(i, 1);
        valveDisabled = true;
        break;
      }
    }
    if (!valveDisabled) {
      attributes.push(_valve.name);
    }
    this.schedule.content.sprinkler_attributes = attributes;
    this.scheduleService.schedule = this.schedule;
    this.scheduleService.validateSchedule();
  }

  setIntervalTime() {
    if (this.intervalTime > 0) {
      this.schedule.content.interval = {
        type: this.intervalTimeType,
        value: this.intervalTime
      }
    }
    this.scheduleService.schedule = this.schedule;
    this.scheduleService.validateSchedule();
  }
}
