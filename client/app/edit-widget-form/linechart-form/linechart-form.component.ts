import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UtilService } from '../../services/util.service';
import { DeviceService } from '../../services/device.service';
import { Device } from '../../shared/models/device.model';
import { forEach } from '@angular/router/src/utils/collection';

@Component({
  selector: 'linechart-form',
  templateUrl: './linechart-form.component.html',
  styleUrls: ['./linechart-form.component.scss']
})
export class LinechartFormComponent implements OnInit {
  @Input('model') model: any;
  @Output('complete') complete = new EventEmitter();
  @Output('cancel') cancel = new EventEmitter();

  devices: Device[];
  periodValue: number = 3;
  periodUnit: number = 86400;

  constructor(
    public util: UtilService,
    private deviceService: DeviceService
  ) { }

  ngOnInit() {
    this.getDevices();
  }

  addLine() {
    this.model.data.lines.push({
      color: "",
      data: {
        device_id: "",
        field: ""
      },
      legend: ""
    });
  }

  removeLine(idx: number) {
    this.model.data.lines.splice(idx, 1);
  }

  onSubmit() {
    let today: number = new Date().getTime();
    this.model.data.range = {
      from: today - (this.periodValue * this.periodUnit * 1000)
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
