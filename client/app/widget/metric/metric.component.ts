import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UtilService, Widget } from '../../services/util.service';
import { DeviceService } from '../../services/device.service';
import { Observable } from 'rxjs/Rx';

@Component({
  selector: 'metric',
  templateUrl: './metric.component.html',
  styleUrls: ['./metric.component.scss']
})
export class MetricComponent implements OnInit, Widget {
  getInvolvedDevices(): string[] {
    return [this.getDataRequest()[0].device_id];
  }
  update(): void {
    let dataRequest = this.getDataRequest();
    this.getInitData(dataRequest);
  }

  isDeleting: boolean;
  isEditing: boolean;
  @Output() deleteEvent = new EventEmitter();
  @Output() editEvent = new EventEmitter();

  constructor(
    public util: UtilService,
    private deviceService: DeviceService
  ) { }

  @Input('data') widgetInfo: any;
  @Input('name') widgetName: string = "No widget";
  @Input('refreshInterval') refreshInterval: number;

  widgetData: any;
  data: any = {};
  field: string;
  model: any = {
    name: "N/A",
    data: {
      field: "N/A",
      unit: "N/A"
    }
  };

  ngOnInit() {
    this.widgetData = this.widgetInfo.data;
    this.model = this.widgetInfo;
    this.field = this.widgetData.field;
    let dataRequest = this.getDataRequest();
    this.getInitData(dataRequest);
    this.reloadData(dataRequest);
  }

  getInitData(dataRequest) {
    this.deviceService.getDeviceData(dataRequest).subscribe(res => {
      if (res[0].data.length == 0) {
        this.data[this.field] = "N/A";
      } else {
        this.data = res[0].data[0];
      }
    }, error => {
      console.log(error);
    });
  }

  reloadData(dataRequest) {
    Observable.interval(this.refreshInterval).subscribe(x => {
      this.getInitData(dataRequest);
    });
  }

  getDataRequest(): any {
    let dataRequest: Array<any> = [];
    dataRequest.push({
      device_id: this.widgetData.device_id,
      fields: [this.widgetData.field]
    });
    return dataRequest;
  }

  setDelete(value: boolean) {
    this.isDeleting = value;
  }

  setEdit(value: boolean) {
    this.isEditing = value;
  }

  deleteWidget() {
    this.deleteEvent.emit();
  }

  onSubmit() {
    this.editEvent.emit(this.model);
  }

}
