import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UtilService, Widget } from '../../services/util.service';
import { Observable } from 'rxjs/Rx';

@Component({
    selector: 'switch-widget',
    templateUrl: './switch-widget.component.html',
    styleUrls: ['./switch-widget.component.scss']
})
export class SwitchWidgetComponent implements OnInit,Widget {
    update(): void {
        console.log("updating switch");
        //TODO: write update function
    }
    getInvolvedDevices(): string[] {
        return [];
        //TODO: write get involved devices function
    }

    isDeleting: boolean;
    isEditing: boolean;
    @Output() deleteEvent = new EventEmitter();
    @Output() editEvent = new EventEmitter();
    constructor() { }

    ngOnInit() {

    }

    setDelete(value: boolean) {
        this.isDeleting = value;
    }

    deleteWidget() {
        this.deleteEvent.emit();
    }
}
