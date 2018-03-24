import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Device } from '../../shared/models/device.model';
import { UtilService } from '../../services/util.service';
import { Router } from '@angular/router';

@Component({
  selector: 'device-card',
  templateUrl: './device-card.component.html',
  styleUrls: ['./device-card.component.scss']
})
export class DeviceCardComponent implements OnInit {

  @Input('device') device: Device;
  @Output('onChange') onChange = new EventEmitter();
  @Output('onEdit') onEdit = new EventEmitter();
  @Output('onDelete') onDelete = new EventEmitter();

  isDeleting: boolean = false;
  
  constructor(
    private router: Router,
    public util: UtilService
  ) { }

  ngOnInit() {
  }

  setDelete(value: boolean) {
    this.isDeleting = value;
  }

  setEdit() {
    this.router.navigate(['/devices', this.device.id])
  }

  checkboxChanged(event: any) {
    let change = {
      id: this.device.id,
      state: event.target.checked
    };
    this.onChange.emit(change);
  }

  TriggerDelete() {
    this.isDeleting = false;
    this.onDelete.emit(this.device);
  }
}
