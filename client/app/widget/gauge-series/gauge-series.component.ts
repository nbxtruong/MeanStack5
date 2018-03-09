import { Component, OnInit, Input, Output, EventEmitter, ElementRef, ViewChild } from '@angular/core';
import { UtilService, Widget } from '../../services/util.service';
import { DeviceService } from '../../services/device.service';
import { Observable } from 'rxjs/Rx';
import { Chart } from 'angular-highcharts';

@Component({
  selector: 'gauge-series',
  templateUrl: './gauge-series.component.html',
  styleUrls: ['./gauge-series.component.scss']
})
export class GaugeSeriesComponent implements OnInit, Widget {
  update(message = ""): void {
    let dataRequest = this.getDataRequest();
    this.getInitData(dataRequest);
  }

  getInvolvedDevices(): string[] {
    return [this.getDataRequest()[0].device_id];
  }

  @Output() deleteEvent = new EventEmitter();
  @Output() editEvent = new EventEmitter();
  @ViewChild('content') contentView: ElementRef;
  @Input('data') widgetInfo: any;
  @Input('name') widgetName: string = "No widget";

  isDeleting: boolean;
  isEditing: boolean;
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

  constructor(
    public util: UtilService,
    private deviceService: DeviceService
  ) { }

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

  getDataRequest(): any {
    let dataRequest: Array<any> = [];
    dataRequest.push({
      device_id: this.widgetData.device_id,
      fields: [this.widgetData.field]
    });
    return dataRequest;
  }

  drawChart(value, unit) {
    let drawOptions = new Chart({
      chart: {
        type: 'gauge',
        plotBackgroundColor: null,
        plotBackgroundImage: null,
        plotBorderWidth: 0,
        plotShadow: false,
        height: this.contentView.nativeElement.offsetHeight,
        width: this.contentView.nativeElement.offsetWidth
      },
      title: {
        text: ''
      },
      pane: {
        startAngle: -150,
        endAngle: 150,
        background: [{
          backgroundColor: {
            linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
            stops: [
              [0, '#e5e5e5'],
              [1, '#e5e5e5']
            ]
          },
          borderWidth: 0,
          outerRadius: '109%'
        }, {
          backgroundColor: {
            linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
            stops: [
              [0, '#e5e5e5'],
              [1, '#e5e5e5']
            ]
          },
          borderWidth: 1,
          outerRadius: '107%'
        }, {
          backgroundColor: '#e5e5e5',
          borderWidth: 0,
          outerRadius: '105%',
          innerRadius: '103%'
        }]
      },
      yAxis: {
        min: 0,
        max: 100,

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
          step: 2,
        },
        plotBands: [{
          from: 0,
          to: 50,
          color: '#55BF3B' // green
        }, {
          from: 50,
          to: 80,
          color: '#DDDF0D' // yellow
        }, {
          from: 80,
          to: 100,
          color: '#DF5353' // red
        }]
      },
      series: [{
        name: '',
        data: []
      }],
      credits: {
        enabled: false
      },
      exporting: {
        enabled: false
      }
    });

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
    this.ngOnInit();
    this.editEvent.emit(this.model);
  }

}
