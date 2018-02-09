import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UtilService } from '../../services/util.service';
import { Device } from '../../shared/models/device.model';
import { DeviceService } from '../../services/device.service';


@Component({
  selector: 'device-edit',
  templateUrl: './device-edit.component.html',
  styleUrls: ['./device-edit.component.scss']
})
export class DeviceEditComponent implements OnInit {

  device: Device = new Device({});
  devices: Device[] = [];
  constructor(
    private route: ActivatedRoute,
    public util: UtilService,
    private deviceService: DeviceService
  ) { }

  ngOnInit() {
    let deviceID = this.route.snapshot.paramMap.get('id');
    this.getDevice(deviceID);
  }

  getDevice(deviceID: String) {
    this.deviceService.getDevice(deviceID).subscribe(
      res => {
        this.device = res;
      },
      error => {
        console.log(error);
      }
    )
  }
}
