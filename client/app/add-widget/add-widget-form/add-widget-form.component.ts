import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { UtilService } from '../../services/util.service';
import { DeviceService } from '../../services/device.service';
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
  sprinklers: any[] = [];
  allAttribute: Array<any> = [];
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
      if (controller.gateway_id) {
        this.model.data.gateway_id = controller.gateway_id;
      }
      else {
        this.model.data.gateway_id = controller.id;
      }
    }
  }

  ngOnInit() {
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
        this.sprinklers = res[0];
      },
      error => {
        console.log(error);
      }
    )
  }

  getSensors() {
    this.deviceService.getSensors().subscribe(
      res => {
        this.sensors = res[0];
      },
      error => {
        console.log(error);
      }
    )
  }

  getAttributesForGauge() {
    let device = this.sensors.find(x => x.id === this.model.data.device_id);
    this.attributes = Object.create(device.attributes);
    if (device.gateway_id) {
      this.model.data.gateway_id = device.gateway_id;
    }
    else {
      this.model.data.gateway_id = device.id;
    }
  }

  getAttributesForChart(index) {
    let device = this.sensors.find(x => x.id === this.lines[index].data.device_id);
    for (let i = 0; i < this.sensors.length; i++) {
      if (device.id === this.sensors[i].id) {
        this.allAttribute[index] = this.sensors[i];
      }
    }
    this.attributes[index] = Object.create(this.allAttribute[index].attributes);
    if (device.gateway_id) {
      this.lines[index].data.gateway_id = device.gateway_id;
    }
    else {
      this.lines[index].data.gateway_id = device.id;
    }
  }
}
