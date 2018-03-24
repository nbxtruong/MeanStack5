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
  styleUrls: ['./device-edit-properties.component.scss']
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
    this.util.isLoading = true;
    this.deviceService.updateDevice(this.device.id, deviceData).subscribe(
      res => {
        this.util.isLoading = false;
        this.toast.setMessage('Device updated successfully!', 'success');
        this.router.navigate(['/devices']);
      },
      error => {
        this.util.isLoading = false;
        this.toast.setMessage('Failed to update device', 'danger');
      }
    )
  }
  getDevice(deviceID: String) {
    this.util.isLoading = true;
    this.deviceService.getDevice(deviceID).subscribe(
      res => {
        this.util.isLoading = false;
        this.device = res;
      },
      error => {
        this.util.isLoading = false;
        console.log(error);
      }
    )
  }

  removeAttribute(attributeIdx: number) {
    this.device.attributes.splice(attributeIdx, 1);
  }

  addAttribute() {
    if (this.device.attributes == null) {
      this.device.attributes = [];
    }
    this.device.attributes.push({
      name: "Name",
      type: "Number"
    });
  }
}
