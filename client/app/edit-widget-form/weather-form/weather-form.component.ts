import { WeatherService } from '../../services/weather-forecast.service';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { UtilService, Widget } from '../../services/util.service';
import { constants } from '../../constants';

@Component({
    selector: 'weather-form',
    templateUrl: './weather-form.component.html',
    styleUrls: ['./weather-form.component.scss']
})
export class WeatherFormComponent implements OnInit, Widget {

    update(): void {
        console.log("updating weather-form");
        //TODO: write update function
    }

    getInvolvedGateways(): string[] {
        throw new Error("Method not implemented.");
    }

    getInvolvedDevices(): string[] {
        return [];
        //TODO: write get involved devices function
    }

    @Output('complete') complete = new EventEmitter();
    @Output('cancel') cancel = new EventEmitter();
    @Input('model') model: any;

    countryList = constants.countryList;
    isDeleting: boolean;
    isEditing: boolean;

    constructor(
        private weatherService: WeatherService,
        public util: UtilService,
    ) { }

    ngOnInit() {
    }

    onCancel() {
        this.cancel.emit();
    }

    onSubmit() {
        this.complete.emit(this.model);
        this.cancel.emit();
    }
}
