import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UtilService, Widget } from '../../services/util.service';
import { Observable } from 'rxjs/Rx';
import { DeviceService } from '../../services/device.service';
import { AppMqttService } from '../../services/app-mqtt.service';
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'switch-widget',
    templateUrl: './switch-widget.component.html',
    styleUrls: ['./switch-widget.component.scss']
})
export class SwitchWidgetComponent extends Widget implements OnInit {
    @Output() deleteEvent = new EventEmitter();
    @Output() editEvent = new EventEmitter();
    @Input('data') widgetInfo: any;

    isDeleting: boolean;
    isEditing: boolean;
    controlCheck: boolean = false;
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
        private deviceService: DeviceService,
        private mqtt: AppMqttService,
        private auth: AuthService
    ) {
        super();
    }

    update(message: any = ""): void {
        if (message != "") {
            let mess = JSON.parse(message);
            if (mess[this.model.attribute] == "1")
                this.controlCheck = true;
            else if (mess[this.model.attribute] == "0")
                this.controlCheck = false;
        }
    }

    getInvolvedGateways(): string[] {
        return [this.widgetInfo.data.gateway_id];
    }

    getInvolvedDevices(): string[] {
        return [this.widgetInfo.data.device_id];
    }

    ngOnInit() {
        this.model = this.widgetInfo;
        this.getData();
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

    getData() {
        let dataRequest: any = [{
            device_id: this.widgetInfo.data.device_id,
            fields: [this.model.attribute]
        }]
        this.deviceService.getDeviceData(dataRequest).subscribe(res => {
            this.controlCheck = res[0].data[0][this.model.attribute];

        }, error => {
            console.log(error);
        })
    }

    onControlChange() {
        let message: any = {
            event: "Control",
            device_id: this.widgetInfo.data.device_id,
            auth: this.auth.currentUser.auth_key
        };
        message[this.model.attribute] = this.controlCheck ? 1 : 0;
        this.mqtt.publish(this.mqtt.getControlTopic(this.widgetInfo.data.gateway_id), JSON.stringify(message));
    }

    onSubmit($event) {
        this.widgetInfo = $event;
        this.ngOnInit();
        this.editEvent.emit($event);
        this.isEditing = false;
    }
}
