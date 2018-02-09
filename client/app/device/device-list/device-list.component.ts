import { Component, OnInit } from '@angular/core';
import { DeviceService } from '../../services/device.service';
import { AuthService } from '../../services/auth.service';
import * as $ from 'jquery';
import 'datatables.net';
import { UtilService } from '../../services/util.service';
import { Device } from '../../shared/models/device.model';
import { ToastComponent } from '../../shared/toast/toast.component';

@Component({
  selector: 'device-list',
  templateUrl: './device-list.component.html',
  styleUrls: ['./device-list.component.scss']
})
export class DeviceListComponent implements OnInit {

  token: String = localStorage.getItem('token');
  devices: Device[];
  deviceToDelete: Device;
  idsToDelete: Set<String> = new Set<String>();
  enableDeleteButton: Boolean = true;
  dummyDevice: Device = new Device({});
  tableInitiated: boolean = false;
  table: any;

  constructor(
    private deviceService: DeviceService,
    private auth: AuthService,
    public util: UtilService,
    public toast: ToastComponent
  ) { }

  initDatatable() {
    let ngThis = this;
    this.tableInitiated = true;
    $(document).ready(function () {
      ngThis.table = $('#datatable').DataTable({
        stateSave: true,
        pagingType: 'full_numbers',
        dom: '<"top"fB>rt<"bottom"ipl>',
        columnDefs: [
          {
            orderable: false,
            targets: [0, 6],
            className: 'dt-center'
          },
          {
            targets: [0],
            searchable: false,
            orderable: false,
            className: 'dt-center'
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
    this.util.isLoading = true;
    this.getDevices();
    this.deviceToDelete = this.dummyDevice;
  }

  getDevices() {
    this.deviceService.getListDevices().subscribe(
      res => {
        this.util.isLoading = false;
        this.devices = res;
        if (!this.tableInitiated) {
          this.initDatatable();
        } else {
          this.table.clear().draw();
          this.table.destroy();
          this.initDatatable();
        }
      },
      error => {
      }
    );
  }

  deleteLocal(deviceID: String) {
    this.devices = this.devices.filter(device => {
      return device.id !== deviceID;
    });
  }

  deleteMultipleLocal(devices: String[]) {
    for (let i = 0; i < devices.length; i++) {
      this.deleteLocal(devices[i]);
    }
  }

  deleteDevice() {
    this.util.isLoading = true;
    this.deviceService.deleteDevice(this.deviceToDelete.id).subscribe(
      res => {
        this.getDevices();
      },
      error => {
        console.log(error);
      }
    );
  }

  deleteDevices() {
    this.util.isLoading = true;
    let deletedDeviceIds: String[] = Array.from(this.idsToDelete);
    this.deviceService.deleteDevices(deletedDeviceIds).subscribe(
      res => {
        this.getDevices();
      },
      error => {
        console.log(error);
      }
    );
  }

  setDeleteDevice(device) {
    this.deviceToDelete = device;
  }

  checkAllChanged(event: any) {
    let id = event.target.value;
    if (event.target.checked) {
      this.devices.forEach((device: Device) => {
        this.idsToDelete.add(device.id);
        $("input[value=" + device.id + "]").prop("checked", true);
      });
    } else {
      this.devices.forEach((device: Device) => {
        this.idsToDelete.delete(device.id);
        $("input[value=" + device.id + "]").prop("checked", false);
      });
    }
  }

  checkboxChanged(event: any) {
    let id = event.target.value;
    if (event.target.checked) {
      this.idsToDelete.add(id);
    } else {
      this.idsToDelete.delete(id);
    }
  }
}
