import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UtilService } from '../../services/util.service';
import { DeviceService } from '../../services/device.service';
import { Device } from '../../shared/models/device.model';

@Component({
  selector: 'switch-form',
  templateUrl: './switch-form.component.html',
  styleUrls: ['./switch-form.component.scss']
})
export class SwitchFormComponent implements OnInit {

  @Input('model') model: any;
  @Output('complete') complete = new EventEmitter();
  @Output('cancel') cancel = new EventEmitter();

  controllers: Device[] = [];
  attributes: Array<any> = [];

  constructor(
    public util: UtilService,
    private deviceService: DeviceService
  ) { }

  ngOnInit() {
    this.getSprinklers();
  }

  getControllerAttributes() {
    let controller = this.controllers.find((element) => {
      return element.id === this.model.data.device_id;
    });
    if (controller) {
      this.attributes = controller.attributes;
    }
  }

  getSprinklers() {
    this.deviceService.getSprinklers().subscribe(
      res => {
        this.controllers = res[0];
        this.getControllerAttributes();
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

}
