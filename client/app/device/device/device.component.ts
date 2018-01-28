import { Component, OnInit, AfterViewInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UtilService } from '../../services/util.service';
declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-devices',
  templateUrl: './device.component.html',
  styleUrls: ['./device.component.scss']
})
export class DeviceComponent implements OnInit, AfterViewInit {
  deviceName: string;
  constructor(
    private route: ActivatedRoute,
    private util: UtilService
  ) { }

  ngOnInit() {
    this.util.setCurrentDeviceID(this.route.snapshot.paramMap.get('id'));
  }

  ngAfterViewInit() {
    this.initFrontendScript();
  }

  initFrontendScript() {
  }

}
