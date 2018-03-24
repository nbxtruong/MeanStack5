import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { UtilService } from '../../services/util.service';
import { ToastComponent } from '../../shared/toast/toast.component';
import { Location } from '@angular/common';
import { Device } from '../../shared/models/device.model';
import { DeviceService } from '../../services/device.service';
import { Router, ActivatedRoute } from '@angular/router';
import * as $ from 'jquery';
import 'datatables.net';
import { Page } from '../../shared/page';

@Component({
  selector: 'app-device-edit-data',
  templateUrl: './device-edit-data.component.html',
  styleUrls: ['./device-edit-data.component.scss']
})
export class DeviceEditDataComponent implements OnInit {
  data: Array<any>;
  tableInitiated: boolean = false;
  table: any;

  rows = [];
  columns = [
    { prop: 'time' },
    { prop: 'data' }
  ];
  constructor(
    private deviceService: DeviceService,
    private auth: AuthService,
    private router: Router,
    private location: Location,
    private userService: UserService,
    public util: UtilService,
    public toast: ToastComponent,
    private route: ActivatedRoute,
  ) {
  }
  start: number = 0;
  end: number = 0;
  current: number = 0;
  limit: number = 10;
  deviceId: string = "";
  map: Map<number, number> = new Map();

  ngOnInit() {
    this.map.set(this.current, -1);
    this.deviceId = this.route.parent.snapshot.paramMap.get('id');
    this.setPage();
  }

  convertData(data) {
    data.forEach(d => {
      d.created_at = new Date(d.created_at).toLocaleString();
      let attributes: Array<{ key: string, value: any }> = [];
      for (let prop in d) {
        if (prop != "created_at" && prop != "device_id") {
          let key = prop;
          let value = d[prop];
          attributes.push({
            key: key,
            value: value
          });
        }
      }
      d.attributes = attributes;
    });
  }

  stringigyAttributes(attrs: Array<{ key: string, value: any }>): string {
    let str: string = "";
    attrs.forEach(e => {
      str += "<p>" + e.key + ": " + e.value + "</p>";
    });
    return str;
  }

  setPage() {
    this.start = this.current * this.limit + 1;
    this.end = (this.current + 1) * this.limit;
    let request = {
      device_id: this.deviceId,
      limit: this.limit,
      created_at: this.map.get(this.current)
    };
    this.util.isLoading = true;
    this.deviceService.getSingleDeviceData(request).subscribe(res => {
      this.util.isLoading = false;
      this.map.set(this.current + 1, res.created_at);
      this.toRowsData(res.data);
    }, error => {
      this.util.isLoading = false;
      console.log(error);
    });
  }

  toRowsData(data) {
    this.convertData(data);
    let newRows = [];
    data.forEach(d => {
      newRows.push({
        time: d.created_at,
        data: this.stringigyAttributes(d.attributes)
      })
    });
    this.rows = newRows;
  }

  onLeft() {
    this.current--;
    this.setPage();
  }

  onRight() {
    this.current++;
    this.setPage();
  }

  onSizeChange() {
    this.current = 0;
    this.setPage();
  }
}
