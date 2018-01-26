import { Component, OnInit, AfterViewInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UtilService } from '../../services/util.service';
declare var jquery: any;
declare var $: any;

@Component({
  selector: 'devices',
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
    this.deviceName = this.route.snapshot.paramMap.get('name');
  }

  ngAfterViewInit() {
    this.initFrontendScript();
  }

  initFrontendScript() {
  }

}
