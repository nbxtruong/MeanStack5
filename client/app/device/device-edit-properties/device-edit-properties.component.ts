import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DeviceService } from '../../services/device.service';
import { AuthService } from '../../services/auth.service';
import { UtilService } from '../../services/util.service';
import { Device } from '../../shared/models/device.model';

@Component({
  selector: 'device-edit-properties',
  templateUrl: './device-edit-properties.component.html',
  styleUrls: ['./device-edit-properties.component.css']
})
export class DeviceEditPropertiesComponent implements OnInit {

  token: String = localStorage.getItem('token');

  constructor(
    private deviceService: DeviceService,
    private auth: AuthService,
    private router: Router,
    private util: UtilService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    let deviceID = this.route.parent.snapshot.paramMap.get('id');
  }
}
