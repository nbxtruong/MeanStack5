import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UtilService } from '../../services/util.service';
import { DeviceService } from '../../services/device.service';
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

  periodValue: number = 3;
  periodUnit: number = 86400;
  attributes: Array<any> = [];
  allAttribute: Array<any> = [];
  sensors = [];

  constructor(
    public util: UtilService,
    private deviceService: DeviceService
  ) { }

  ngOnInit() {
    this.getSensors();
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

  getSensors() {
    this.deviceService.getSensors().subscribe(
      res => {
        this.sensors = res[0];
        for (let index = 0; index < this.model.data.lines.length; index++) {
          this.getAttributesForChart(index);
        }
      },
      error => {
        console.log(error);
      }
    )
  }

  getAttributesForChart(index) {
    let device = this.sensors.find(x => x.id === this.model.data.lines[index].data.device_id);
    for (let i = 0; i < this.sensors.length; i++) {
      if (device.id === this.sensors[i].id) {
        this.allAttribute[index] = this.sensors[i];
      }
    }
    this.attributes[index] = Object.create(this.allAttribute[index].attributes);
  }
}
