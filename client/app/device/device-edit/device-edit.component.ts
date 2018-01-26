import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DeviceService } from '../../services/device.service';
import { AuthService } from '../../services/auth.service';
import { UtilService } from '../../services/util.service';

@Component({
  selector: 'device-edit',
  templateUrl: './device-edit.component.html',
  styleUrls: ['./device-edit.component.css']
})
export class DeviceEditComponent implements OnInit {

  token: String = localStorage.getItem('token');
  deviceID: String;

  constructor(
    private deviceService: DeviceService,
    private auth: AuthService,
    private router: Router,
    private util: UtilService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.getDevice();
    console.log("route:"+this.route.snapshot.paramMap.get('name'));
  }

  getDevice() {
    this.deviceService.getDeviceInfo(this.deviceID).subscribe(
      res => {
        console.log(res);
      },
      error => {
        console.log(error);
      }
    )
  }
}
