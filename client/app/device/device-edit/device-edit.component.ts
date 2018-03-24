import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { UtilService } from '../../services/util.service';
import { Device } from '../../shared/models/device.model';
import { DeviceService } from '../../services/device.service';


@Component({
  selector: 'device-edit',
  templateUrl: './device-edit.component.html',
  styleUrls: ['./device-edit.component.scss']
})
export class DeviceEditComponent implements OnInit {

  currentUrl: string = "";
  routeLast: string = "";
  device: Device = new Device({});
  devices: Device[] = [];

  constructor(
    private route: ActivatedRoute,
    public util: UtilService,
    private deviceService: DeviceService,
    private router: Router
  ) { }

  ngOnInit() {
    this.currentUrl = this.router.url;
    this.routeLast = this.currentUrl.slice(this.currentUrl.lastIndexOf('/') + 1);
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.currentUrl = event.url;
        this.routeLast = this.currentUrl.slice(this.currentUrl.lastIndexOf('/') + 1);
      }
    });

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
