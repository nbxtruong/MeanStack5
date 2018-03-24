import { Component, OnInit, Output, EventEmitter, Input, ViewChild, ElementRef } from '@angular/core';
import { UtilService, Widget } from '../../services/util.service';
import { DeviceService } from '../../services/device.service';
@Component({
  selector: 'gauge-chart',
  templateUrl: './gauge-chart.component.html',
  styleUrls: ['./gauge-chart.component.scss']
})
export class GaugeChartComponent extends Widget implements OnInit {
  getInvolvedGateways(): string[] {
    return [this.widgetInfo.data.gateway_id];
  }

  getInvolvedDevices(): string[] {
    return [this.getDataRequest()[0].device_id];
  }
  update(message = ""): void {
    let dataRequest = this.getDataRequest();
    this.getInitData(dataRequest);
  }

  @Input('data') widgetInfo: any;
  @Output() deleteEvent = new EventEmitter();
  @Output() editEvent = new EventEmitter();
  @ViewChild('content') contentView: ElementRef;

  constructor(
    public util: UtilService,
    private deviceService: DeviceService
  ) { super() }

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
  isDeleting: boolean;
  isEditing: boolean;
  gaugeSize = 0;
  gaugeThick = 0;
  //Set gauge chart default options
  options: any = {
    type: "arch",
    value: 0,
    label: "Loading...",
    append: this.model.unit
  }

  bindData() {
    let height = this.contentView.nativeElement.offsetHeight;
    let width = this.contentView.nativeElement.offsetWidth;
    this.gaugeSize = width < height ? width : height;
    this.gaugeThick = 0;
    setTimeout(() => { this.gaugeThick = 20; }, 500);
    this.options.value = this.data[this.field].toFixed(1);
    this.options.label = this.field;
    this.options.append = this.model.data.unit;
  }

  ngOnInit() {
    this.widgetData = this.widgetInfo.data;
    this.model = this.widgetInfo;
    this.field = this.widgetData.field;
    let dataRequest = this.getDataRequest();
    this.getInitData(dataRequest);
  }

  getInitData(dataRequest) {
    this.deviceService.getDeviceData(dataRequest).subscribe(res => {
      if (res[0].data.length == 0) {
        this.data[this.field] = "N/A";
        this.bindData();
      } else {
        this.data = res[0].data[0];
        this.bindData();
      }
    }, error => {
      console.log(error);
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
    this.ngOnInit();
    this.editEvent.emit(this.model);
  }
}
