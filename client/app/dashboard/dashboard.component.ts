import { Component, OnInit, ViewChildren, QueryList } from '@angular/core';
import { GridsterConfig, GridsterItem } from 'angular-gridster2';
import { DashboardService } from '../services/dashboard.service';
import { ToastComponent } from '../shared/toast/toast.component';
import { Observable } from 'rxjs/Rx';
import { UtilService, Widget } from '../services/util.service';
import { AfterViewInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { AppMqttService } from '../services/app-mqtt.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, AfterViewInit {

  @ViewChildren('widget') widgets: QueryList<Widget>;

  ngAfterViewInit(): void {
    this.widgets.changes.subscribe(() => {
      console.log(this.widgets.toArray());
      this.widgets.forEach((widget) => {
        widget.getInvolvedDevices().forEach(deviceId => {
          let topic = this.mqtt.getUpdateTopic(deviceId);
          this.mqtt.subscribe(topic, widget);
        });
      });
    })
  }

  constructor(
    private dashboardService: DashboardService,
    public toast: ToastComponent,
    public util: UtilService,
    private mqtt: AppMqttService
  ) { }

  options: GridsterConfig;
  dashboardInfo: any = { name: "Loading..." };

  static itemChange(item, itemComponent) {
  }

  static itemResize(item, itemComponent) {
  }

  ngOnInit() {
    this.initDashboardOption();
    this.mqtt.connect();
  }

  initDashboardOption() {
    this.util.editMode = false;
    this.options = {
      itemChangeCallback: DashboardComponent.itemChange,
      itemResizeCallback: DashboardComponent.itemResize,
      gridType: 'scrollVertical',
      mobileBreakpoint: 0,
      margin: 4,
      minCols: 20,
      maxCols: 20,
      outerMargin: true,
      draggable: {
        enabled: false
      },
      resizable: {
        enabled: false
      },
      pushItems: true
    };

    this.getDashboard();
  }

  changedOptions() {
    this.options.api.optionsChanged();
  }

  removeItem(item) {
    this.dashboardInfo.content.splice(this.dashboardInfo.content.indexOf(item), 1);
  }

  removeIndex(idx: number) {
    this.dashboardInfo.content.splice(idx, 1);
    this.saveDashboards();
  }

  addUtilWidget() {
    if (this.util.newWidget != null) {
      this.dashboardInfo.content.push(this.util.newWidget);
      this.util.newWidget = null;
      this.saveDashboards();
    }
  }

  changeEditMode(state) {
    if (!state) {
      this.util.isLoading = true;
      this.saveDashboards();
    } else {
      this.util.isLoading = false;
    }

    this.util.editMode = state;
    this.options.draggable.enabled = state;
    this.options.resizable.enabled = state;
    this.changedOptions();
  }

  saveDashboards() {
    this.dashboardService.saveDashboards(this.dashboardInfo.id, this.dashboardInfo).subscribe(
      res => {
        this.toast.setMessage('Device updated successfully!', 'success');
        this.util.isLoading = false;
      },
      error => this.toast.setMessage('Failed to update device', 'danger')
    );
  }

  getDashboard() {
    this.dashboardService.getDashboards().subscribe(res => {
      this.dashboardInfo = res[0];
      this.addUtilWidget();
    }, error => {
      console.log(error);
    });
  }

  editIndex(event, idx) {
    this.dashboardInfo.content[idx] = event;
    this.dashboardInfo.content[idx].name = event.name;
    this.dashboardInfo.content[idx].data.country = event.country;
    this.dashboardInfo.content[idx].data.city = event.city;
    this.saveDashboards();
  }
}
