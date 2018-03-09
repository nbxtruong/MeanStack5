import { Component, OnInit } from '@angular/core';
import { UtilService } from '../services/util.service';
import { Router } from '@angular/router';
import { Device } from '../shared/models/device.model';
import { DeviceService } from '../services/device.service';
import { Location } from '@angular/common';
declare var jquery: any;
declare var $: any;

@Component({
  selector: 'add-widget',
  templateUrl: './add-widget.component.html',
  styleUrls: ['./add-widget.component.scss']
})
export class AddWidgetComponent implements OnInit {

  chosenTemplate: string = null;
  devices: Device[];
  model: any = {};
  lines = [];
  periodValue: number;
  periodUnit: number;

  constructor(
    public util: UtilService,
    private router: Router,
    private deviceService: DeviceService,
    private location:Location
  ) { }

  ngOnInit() {
    $(function () {
      $('[data-toggle="tooltip"]').tooltip()
    });
  }

  onComplete(result) {
    this.util.newWidget = result;
    this.location.back();
  }
}
