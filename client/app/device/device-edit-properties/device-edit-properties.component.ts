import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DeviceService } from '../../services/device.service';
import { AuthService } from '../../services/auth.service';
import { UtilService } from '../../services/util.service';
import { Device } from '../../shared/models/device.model';
import { ToastComponent } from '../../shared/toast/toast.component';


@Component({
  selector: 'device-edit-properties',
  templateUrl: './device-edit-properties.component.html',
  styleUrls: ['./device-edit-properties.component.css']
})
export class DeviceEditPropertiesComponent implements OnInit {

  token: String = localStorage.getItem('token');
  device: Device = new Device({});
  devices: Device[] = [];

  constructor(
    private deviceService: DeviceService,
    private auth: AuthService,
    private router: Router,
    private util: UtilService,
    private route: ActivatedRoute,
    public toast: ToastComponent
  ) { }

  ngOnInit() {
    let deviceID = this.route.parent.snapshot.paramMap.get('id');
    this.getDevice(deviceID);
  }

  saveDevice() {
    const deviceData = { "name": this.device.name, "description": this.device.description };
    this.deviceService.updateDevice(this.device.id, deviceData).subscribe(
      res => {
        this.toast.setMessage('Device updated successfully!', 'success');
        this.router.navigate(['/device-list']);
      },
      error => this.toast.setMessage('Failed to update device', 'danger')
    )
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
