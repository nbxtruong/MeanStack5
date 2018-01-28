import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DeviceService } from '../../services/device.service';
import { AuthService } from '../../services/auth.service';
import { UtilService } from '../../services/util.service';

@Component({
  selector: 'app-device-edit',
  templateUrl: './device-edit.component.html',
  styleUrls: ['./device-edit.component.scss']
})
export class DeviceEditComponent implements OnInit {

  token: String = localStorage.getItem('token');
  deviceID: String = this.util.getCurrentDeviceID();

  constructor(
    private deviceService: DeviceService,
    private auth: AuthService,
    private router: Router,
    private util: UtilService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.getDevice();
  }

  getDevice() {
    this.deviceService.getDeviceInfo(this.deviceID).subscribe(
      res => {
        console.log(res);
      },
      error => {
        console.log(error);
      }
    );
  }
}
