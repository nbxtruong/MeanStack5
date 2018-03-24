import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { UtilService } from '../../services/util.service';
import { DeviceService } from '../../services/device.service';
import { Schedule } from '../../shared/schedule';
import { AmazingTimePickerService } from 'amazing-time-picker';
import { ToastComponent } from '../../shared/toast/toast.component';
import { ScheduleService } from '../../services/schedule.service';

@Component({
  selector: 'fixed-daily',
  templateUrl: './fixed-daily.component.html',
  styleUrls: ['./fixed-daily.component.scss']
})
export class FixedDailyComponent implements OnInit {

  @Input('schedule') schedule: any;
  @Input('sprinklers') sprinklers: Array<any>;
  days = [];
  time;
  duration;
  sprinkler_attributes = [];
  valves = [];
  selectedSprinkler: any;
  constructor(
    private util: UtilService,
    private deviceService: DeviceService,
    private toast: ToastComponent,
    private scheduleService: ScheduleService,
    private timepicker: AmazingTimePickerService
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
    if (this.schedule.type != Schedule.FIXED_DAILY) {
      this.initializeFixedDailySchedule();
      this.time = "";
      this.schedule.content.sprinkler_id = "Sprinkler";
      this.selectedSprinkler = this.schedule.content.sprinkler_id;
    }
    else {
      this.time = this.schedule.content.time.hours + ":" + this.schedule.content.time.minutes;
    }
  }

  ngOnDestroy() {
    this.scheduleService.schedule.name = "";
    this.scheduleService.isValidSchedule = false;
  }

  initializeFixedDailySchedule() {
    this.schedule = {
      "content": {
        "sprinkler_name": ""
      },
      "name": ""
    };
    this.schedule.content.duration = 1;
    this.schedule.content.days = [
      {
        "day": "MON",
        "enabled": 0
      },
      {
        "day": "TUE",
        "enabled": 0
      },
      {
        "day": "WED",
        "enabled": 0
      },
      {
        "day": "THU",
        "enabled": 0
      },
      {
        "day": "FRI",
        "enabled": 0
      },
      {
        "day": "SAT",
        "enabled": 0
      },
      {
        "day": "SUN",
        "enabled": 0
      }
    ];
    this.schedule.content.sprinkler_attributes = [];
    this.schedule.content.sprinkler_name = "";
    this.schedule.content.time = {
      hours: 0,
      minutes: 0
    };
    this.time = this.schedule.content.time.hours + ":" + this.schedule.content.time.minutes;
    this.schedule.type = Schedule.FIXED_DAILY;
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

  setDays(_date) {
    let date = <String>_date;
    let days = this.schedule.content.days;
    for (let i = 0; i < days.length; i++) {
      if ((<String>days[i].day).match(date.toUpperCase())) {
        days[i].enabled = 1 - days[i].enabled;
      }
    }
    this.schedule.content.days = days;
    this.scheduleService.schedule = this.schedule;
    this.scheduleService.validateSchedule();
  }

  setTime() {
    let _time = <String>this.time;
    let splitTime = _time.split(':');
    this.schedule.content.time = {
      hours: splitTime[0],
      minutes: splitTime[1]
    };
    this.scheduleService.schedule = this.schedule;
    this.scheduleService.validateSchedule();
  }
}
