import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UtilService } from '../../services/util.service';
import { DeviceService } from '../../services/device.service';
import { Device } from '../../shared/models/device.model';

@Component({
    selector: 'gaugechart-from',
    templateUrl: './gaugechart-from.component.html',
    styleUrls: ['./gaugechart-from.component.scss']
})
export class GaugechartFormComponent implements OnInit {
    @Input('model') model: any;
    @Output('complete') complete = new EventEmitter();
    @Output('cancel') cancel = new EventEmitter();
    devices: Device[];
    attributes: Array<any> = [];
    sensors: Array<any> = [];

    constructor(
        public util: UtilService,
        private deviceService: DeviceService
    ) { }

    ngOnInit() {
        this.getDevices();
        this.getSensors();
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

    onSubmit() {
        this.complete.emit(this.model);
        this.cancel.emit();
    }

    onCancel() {
        this.cancel.emit();
    }

    getSensors() {
        this.deviceService.getSensors().subscribe(
            res => {
                this.sensors = res;
                this.getAttributes();
            },
            error => {
                console.log(error);
            }
        )
    }

    getAttributes() {
        this.attributes = Object.create(this.sensors.find(x => x.id === this.model.data.device_id).attributes);
    }

}
