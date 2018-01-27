import { Component, OnInit } from '@angular/core';
import { DeviceService } from '../../services/device.service';
import { AuthService } from '../../services/auth.service';
import * as $ from 'jquery';
import 'datatables.net';
import { UtilService } from '../../services/util.service';
import { Device } from '../../shared/models/device.model';

@Component({
  selector: 'app-device-list',
  templateUrl: './device-list.component.html',
  styleUrls: ['./device-list.component.scss']
})
export class DeviceListComponent implements OnInit {

  token: String = localStorage.getItem('token');
  devices: Array<Device>;

  constructor(
    private deviceService: DeviceService,
    private auth: AuthService,
    private util: UtilService
  ) { }

  initDatatable() {
    $(document).ready(function () {
      $('#datatable').DataTable({
        stateSave: true,
        pagingType: 'full_numbers',
        dom: '<"top"fB>rt<"bottom"ipl>',
        columnDefs: [
          { orderable: false, targets: [-1, 0] },
          {
            targets: 0,
            searchable: false,
            orderable: false,
            className: 'dt-body-center',
            render: function (data, type, full, meta) {
              return '<input type="checkbox" name="id[]" value="' + $('<div/>').text(data).html() + '">';
            },
          }
        ],
        language: {
          search: '_INPUT_',
          searchPlaceholder: 'Search by name',
          zeroRecords: 'Nothing found - sorry',
          info: 'Show _START_ to _END_ of _TOTAL_ items',
          lengthMenu: '_MENU_ per page',
          paginate: {
            previous: '<i class="fa fa-angle-left" aria-hidden="true"></i>',
            next: '<i class="fa fa-angle-right" aria-hidden="true"></i>',
            first: '|<i class="fa fa-angle-left" aria-hidden="true"></i>',
            last: '<i class="fa fa-angle-right" aria-hidden="true"></i>|'
          }
        },
      });
    });
  }

  ngOnInit() {
    this.getListDevices();
  }

  getListDevices() {
    console.log(this.token);
    this.deviceService.getListDevices().subscribe(
      res => {
        this.devices = res;
        this.initDatatable();
      },
      error => {
      }
    );
  }

  deleteLocal(deviceID: String) {
    return this.devices.filter(device => {
      return device.id !== deviceID;
    });
  }

  deleteDevice(deviceID) {
    console.log('deleting');
    this.deviceService.softDeleteDevice(deviceID).subscribe(
      res => {
        this.devices = this.deleteLocal(deviceID);
      },
      error => {
        console.log(error);
      }
    );
  }
}
