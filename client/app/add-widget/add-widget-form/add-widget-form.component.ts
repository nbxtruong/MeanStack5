import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { UtilService } from '../../services/util.service';
import { DeviceService } from '../../services/device.service';
import { Device } from '../../shared/models/device.model';
import { constants } from '../../constants';
import { read } from 'fs';

@Component({
  selector: 'add-widget-form',
  templateUrl: './add-widget-form.component.html',
  styleUrls: ['./add-widget-form.component.scss']
})
export class AddWidgetFormComponent implements OnInit {

  @Output('complete') complete = new EventEmitter();
  @Output('cancel') cancel = new EventEmitter();

  @Input('template') chosenTemplate: string = null;
  devices: Device[];
  sprinklers: Device[] = [];
  attributes: Array<any> = [];
  model: any = {};
  lines = [];
  periodValue: number;
  periodUnit: number;
  countryList = constants.countryList;
  sensors = [];  

  constructor(
    public util: UtilService,
    private deviceService: DeviceService
  ) { }

  getControllerAttributes() {
    let controller = this.sprinklers.find((element) => {
      return element.id === this.model.data.device_id;
    });
    if (controller) {
      this.attributes = controller.attributes;
    }
  }

  ngOnInit() {
    this.getDevices();
    this.getSprinklers();
    this.setTemplate(this.chosenTemplate);
    this.getSensors();
  }

  setTemplate(template: string) {
    this.chosenTemplate = template;
    this.model = {
      template: template,
      rows: 4,
      cols: 7,
      x: 0,
      y: 0,
      data: {}
    };
    this.lines = [];
    this.addLine();
    this.periodValue = 3;
    this.periodUnit = 86400;
  }

  addLine() {
    this.lines.push({
      color: "",
      data: {
        device_id: "",
        field: ""
      },
      legend: ""
    });
  }

  removeLine(idx: number) {
    this.lines.splice(idx, 1);
  }

  onSubmit() {
    if (this.chosenTemplate == "linegraph" || this.chosenTemplate == "high-charts") {
      this.model.data.lines = this.lines;
      let today: number = new Date().getTime();
      this.model.data.range = {
        from: today - (this.periodValue * this.periodUnit * 1000)
      }
    }
    this.complete.emit(this.model);
  }

  onCancel() {
    this.cancel.emit();
  }

  getSprinklers() {
    this.deviceService.getSprinklers().subscribe(
      res => {
        this.sprinklers = res;
      },
      error => {
        console.log(error);
      }
    )
  }

  getDevices() {
    this.deviceService.getListDevices().subscribe(
      res => {
        this.devices = res;
      },
      error => {
        console.log(error);
      }
    )
  }

  getSensors() {
    this.deviceService.getSensors().subscribe(
      res => {
        this.sensors = res;
      },
      error => {
        console.log(error);
      }
    )
  }
  getAttributesForGauge() {
    this.attributes = Object.create(this.sensors.find(x => x.id === this.model.data.device_id).attributes);
  }

  getAttributesForChart(index) {
    this.attributes = Object.create(this.sensors.find(x => x.id === this.lines[index].data.device_id).attributes);
  }
}
