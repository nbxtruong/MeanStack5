import { Component, OnInit, Input, EventEmitter, Output} from '@angular/core';
import { UtilService } from '../../services/util.service';
import { DeviceService } from '../../services/device.service';
import { Device } from '../../shared/models/device.model';
import { constants } from '../../constants';

@Component({
  selector: 'widget-form',
  templateUrl: './widget-form.component.html',
  styleUrls: ['./widget-form.component.scss']
})
export class WidgetFormComponent implements OnInit {

  @Output('complete') complete = new EventEmitter();
  @Output('cancel') cancel = new EventEmitter();

  @Input('template') chosenTemplate: string = null;
  devices: Device[];
  model: any = {};
  lines = [];
  periodValue: number;
  periodUnit: number;
  countryList = constants.countryList;

  constructor(
    public util: UtilService,
    private deviceService: DeviceService
  ) { }

  ngOnInit() {
    this.getDevices();
    this.setTemplate(this.chosenTemplate);
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
    if (this.chosenTemplate == "linegraph" || this.chosenTemplate=="high-charts") {
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

}
