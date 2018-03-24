import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { UtilService } from '../../services/util.service';
import { DeviceService } from '../../services/device.service';
import { Schedule } from '../../shared/schedule';
import { AmazingTimePickerService } from 'amazing-time-picker';
import { ToastComponent } from '../../shared/toast/toast.component';
import { ScheduleService } from '../../services/schedule.service';
@Component({
  selector: 'flexible-daily',
  templateUrl: './flexible-daily.component.html',
  styleUrls: ['./flexible-daily.component.scss']
})
export class FlexibleDailyComponent implements OnInit {

  @Input('editting') editting: any;
  @Input('schedule') schedule: any;
  @Input('sensors') sensors: any;
  @Input('devices') devices: any;
  @Input('sprinklers') sprinklers: any;

  days = [];
  time;
  duration;
  sensor_attributes = [];
  valves = [];
  selectedSprinkler: any;
  selectedDevice: any;
  selectedAttribute: any;
  useWeatherForecast: any;
  operatorList: any;
  selectedOperator: any;
  value: any;

  constructor(
    private util: UtilService,
    private deviceService: DeviceService,
    private toast: ToastComponent,
    private scheduleService: ScheduleService,
  ) { }

  ngOnChanges(changes: SimpleChanges) {
    if (this.scheduleService.isEditting) {
      this.setValveList();
      this.setCondition();
      this.setAttribute();
    }
  }

  ngOnInit() {
    if (this.schedule.type != Schedule.FLEXIBLE_DAILY) {
      this.initializeFlexibleSchedule();
      this.selectedSprinkler = "Sprinkler";
      this.selectedDevice = "Device";
      this.selectedAttribute = "Attribute";
      this.selectedOperator = ">";
    }
    else {
      this.selectedSprinkler = this.schedule.content.sprinkler_id;
      this.selectedDevice = this.schedule.content.conditions[0].device_id;
      this.selectedAttribute = this.schedule.content.conditions[0].device_attribute;
      this.selectedOperator = this.schedule.content.conditions[0].operator;
      this.value = this.schedule.content.conditions[0].value;
    }
    this.operatorList = [">", "<", "=", ">=", "<="];
  }

  ngOnDestroy() {
    this.scheduleService.schedule.name = "";
    this.scheduleService.isValidSchedule = false;
  }

  initializeFlexibleSchedule() {
    this.schedule = {
      "content": {
        "sprinkler_name": ""
      },
      "name": ""
    }
    this.schedule.content.duration = 1;
    this.schedule.content.sprinkler_attributes = [];
    this.schedule.content.sprinkler_name = "";
    this.schedule.type = "Flexible Daily";
    this.duration = 1;
    this.value = "";
    this.schedule.content.conditions = [{
      device_attribute: "temperature",
      device_name: "Sensor",
      device_id: "",
      value: "",
      operator: ""
    }];
    this.schedule.content.is_skip_watering = false;
    this.schedule.content.qpf = 1;
    this.schedule.content.forecasting_cycle = 1;
    this.schedule.content.skip_value = 1;
    this.schedule.content.sprinkler_id = "";
    this.scheduleService.schedule = this.schedule;
    this.scheduleService.validateSchedule();
  }

  setAttribute() {
    if (this.selectedDevice != undefined && this.devices != undefined) {
      let sprinkler = this.devices.find(x => x.id === this.selectedDevice);
      if (sprinkler === undefined) {
        return;
      }
      this.sensor_attributes = [];
      sprinkler.attributes.forEach(attribute => {
        this.sensor_attributes.push(attribute);
      });
      this.scheduleService.schedule = this.schedule;
      this.scheduleService.validateSchedule();
    }
  }

  setCondition() {
    if (this.selectedDevice != undefined) {
      if (this.selectedDevice != "Device") {
        let device = this.devices.find(x => x.id === this.selectedDevice);
        if (device === undefined) {
          return;
        }
        let condition = {
          device_id: this.selectedDevice,
          device_attribute: this.selectedAttribute,
          operator: this.selectedOperator,
          value: this.value,
          device_name: device.name
        }
        this.schedule.content.conditions[0] = condition;
      }
      else {
        let condition = {
          device_id: this.selectedDevice,
          device_attribute: this.selectedAttribute,
          operator: this.selectedOperator,
          value: this.value,
          device_name: "Sensor"
        }
        this.schedule.content.conditions[0] = condition;
      }
      this.scheduleService.schedule = this.schedule;
      this.scheduleService.validateSchedule();
    }
  }

  setUseWeatherForecast() {
    this.useWeatherForecast = !this.useWeatherForecast;
    this.schedule.content.is_check_weather_forecast = this.useWeatherForecast;
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

  setSkipWatering() {
    this.schedule.content.is_skip_watering = !this.schedule.content.is_skip_watering;
    this.scheduleService.schedule = this.schedule;
    this.scheduleService.validateSchedule();
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
    this.scheduleService.schedule = this.schedule;
    this.scheduleService.validateSchedule();
  }
}