import { Component, OnInit, Input, Output, EventEmitter, ElementRef, ViewChild } from '@angular/core';
import { UtilService, Widget } from '../../services/util.service';
import { Observable } from 'rxjs/Rx';
import { DeviceService } from '../../services/device.service';
import { Chart } from 'angular-highcharts';

@Component({
    selector: 'high-charts',
    templateUrl: './high-charts.component.html',
    styleUrls: ['./high-charts.component.scss']
})
export class HightChartComponent implements OnInit, Widget {
    update(): void {
        this.init();
        this.getInitData();
    }
    getInvolvedDevices(): string[] {
        let deviceIds: string[] = [];
        this.dataRequest.forEach((device) => {
            if (device.device_id)
                deviceIds.push(device.device_id);
        });
        return deviceIds;
    }

    @ViewChild('content') contentView: ElementRef;
    @Input('data') widgetInfo: any;
    widgetData: any;
    data: Array<any>;
    legends: Array<any> = [];
    dataRequest: Array<any> = [];
    model: any = {};

    isDeleting: boolean;
    isEditing: boolean;
    options: any;
    @Output() deleteEvent = new EventEmitter();
    @Output() editEvent = new EventEmitter();

    constructor(
        public util: UtilService,
        private deviceService: DeviceService
    ) { }

    init() {
        this.widgetData = this.widgetInfo.data;
        let range = this.widgetData.range;
        this.dataRequest = [];
        this.widgetData.lines.forEach(line => {
            this.dataRequest.push({
                device_id: line.data.device_id,
                fields: [line.data.field],
                color: line.color,
                range: range,
                legend: line.legend
            })
        });
    }

    getInitData() {
        this.deviceService.getDeviceData(this.dataRequest).subscribe(res => {
            this.data = res;
            this.drawChart(this.data);
        }, error => {
            console.log(error);
        });
    }

    drawChart(data: Array<any>) {
        let drawOptions = new Chart({
            chart: {
                height: this.contentView.nativeElement.offsetHeight,
                width: this.contentView.nativeElement.offsetWidth
            },
            title: { text: '' },
            series: [],
            xAxis: {
                type: 'datetime',
                dateTimeLabelFormats: {
                    month: '%e. %b',
                    year: '%b'
                },
                title: {
                    text: 'Date'
                }
            },
            yAxis: {
                title: {
                    text: 'Value'
                },
                min: 0
            }
        });

        data.forEach(line => {
            let fieldName = line.fields[0];
            let drawData: Array<any> = [];
            line.data.forEach(d => {
                drawData.push([d.created_at, d[fieldName]]);
            });
            drawOptions.options.series.push(
                {
                    name: line.legend,
                    data: drawData,
                    color: line.color
                }
            )
        });

        this.options = drawOptions;
    }

    ngOnInit() {
        this.init();
        this.getInitData();
    }

    setDelete(value: boolean) {
        this.isDeleting = value;
    }

    deleteWidget() {
        this.deleteEvent.emit();
    }

    setEdit(value: boolean) {
        this.isEditing = value;
    }

    onSubmit($event) {
        this.widgetInfo = $event;
        this.init();
        this.update();
        this.editEvent.emit($event);
        this.isEditing = false;
    }
}
