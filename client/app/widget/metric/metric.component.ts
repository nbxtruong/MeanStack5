import { Component, OnInit, Input } from '@angular/core';
import { UtilService } from '../../services/util.service';
import { DeviceService } from '../../services/device.service';
import { Observable } from 'rxjs/Rx';

@Component({
  selector: 'metric',
  templateUrl: './metric.component.html',
  styleUrls: ['./metric.component.scss']
})
export class MetricComponent implements OnInit {

  constructor(
    public util: UtilService,
    private deviceService: DeviceService
  ) { }

  @Input('data') widgetData: any;
  @Input('name') widgetName: string = "No widget";
  @Input('refreshInterval') refreshInterval: number;

  data: any = {};
  field: string;

  ngOnInit() {
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

  getDataRequest() {
    let dataRequest: Array<any> = [];
    dataRequest.push({
      device_id: this.widgetData.device_id,
      fields: [this.widgetData.field]
    });
    return dataRequest;
  }

}
