import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UtilService, Widget } from '../../services/util.service';
import { DeviceService } from '../../services/device.service';
import { Observable } from 'rxjs/Rx';
import { Chart } from 'angular-highcharts';

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
  options: any;
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
        this.data[this.field] = 'N/A';
        this.drawChart(0, 'N/A');
      } else {
        this.data = res[0].data[0];
        this.drawChart(this.data[this.field], this.field);
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

  drawChart(value, unit) {
    console.log(value);
    let drawOptions = new Chart({
      chart: {
        type: 'gauge',
        plotBackgroundColor: null,
        plotBackgroundImage: null,
        plotBorderWidth: 0,
        plotShadow: false
      },
      title: {
        text: 'Speedometer'
      },
      pane: {
        startAngle: -150,
        endAngle: 150,
        background: [{
          backgroundColor: {
            linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
            stops: [
              [0, '#FFF'],
              [1, '#333']
            ]
          },
          borderWidth: 0,
          outerRadius: '109%'
        }, {
          backgroundColor: {
            linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
            stops: [
              [0, '#333'],
              [1, '#FFF']
            ]
          },
          borderWidth: 1,
          outerRadius: '107%'
        }, {
          backgroundColor: '#DDD',
          borderWidth: 0,
          outerRadius: '105%',
          innerRadius: '103%'
        }]
      },
      yAxis: {
        min: 0,
        max: 200,

        minorTickInterval: 'auto',
        minorTickWidth: 1,
        minorTickLength: 10,
        minorTickPosition: 'inside',
        minorTickColor: '#666',

        tickPixelInterval: 30,
        tickWidth: 2,
        tickPosition: 'inside',
        tickLength: 10,
        tickColor: '#666',
        labels: {
          step: 2
        },
        title: {
          text: 'km/h'
        },
        plotBands: [{
          from: 0,
          to: 120,
          color: '#55BF3B' // green
        }, {
          from: 120,
          to: 160,
          color: '#DDDF0D' // yellow
        }, {
          from: 160,
          to: 200,
          color: '#DF5353' // red
        }]
      },
      series: [{
        name: '',
        data: []
      }]
    });

    drawOptions.options.title.text = unit;
    drawOptions.options.series[0].name = unit;
    drawOptions.options.series[0].data[0] = value;

    this.options = drawOptions;
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
