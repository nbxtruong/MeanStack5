import { Component, OnInit } from '@angular/core';
import { GridsterConfig, GridsterItem } from 'angular-gridster2';
import { DashboardService } from '../services/dashboard.service';
import { ToastComponent } from '../shared/toast/toast.component';
import { Observable } from 'rxjs/Rx';
import { UtilService } from '../services/util.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(
    private dashboardService: DashboardService,
    public toast: ToastComponent,
    public util: UtilService
  ) { }

  options: GridsterConfig;
  dashboardInfo: any = { name: "Loading..." };
  editMode: Boolean = false;

  static itemChange(item, itemComponent) {
  }

  static itemResize(item, itemComponent) {
  }

  ngOnInit() {
    this.initDashboardOption();
  }

  initDashboardOption() {
    this.editMode = false;
    this.options = {
      itemChangeCallback: DashboardComponent.itemChange,
      itemResizeCallback: DashboardComponent.itemResize,
      gridType: 'scrollVertical',
      mobileBreakpoint: 0,
      margin: 4,
      minCols: 16,
      maxCols: 16,
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
  }

  addItem(type: String) {
    if (type === 'weather-forecast') {
      this.dashboardInfo.content.push({
        cols: 5,
        rows: 3,
        minItemCols: 5,
        minItemRows: 3,
        name: "weather-forecast 1",
        template: "weather-forecast",
        x: 0,
        y: 0
      });
    } else {
      console.log('widget type error!!!');
    }
  }

  changeEditMode(state) {
    if (!state) {
      this.util.isLoading = true;
    } else {
      this.util.isLoading = false;
    }

    this.editMode = state;
    this.options.draggable.enabled = state;
    this.options.resizable.enabled = state;
    this.changedOptions();

    if (!state) {
      this.dashboardService.saveDashboards(this.dashboardInfo.id, this.dashboardInfo).subscribe(
        res => {
          this.toast.setMessage('Device updated successfully!', 'success');
          this.util.isLoading = false;
        },
        error => this.toast.setMessage('Failed to update device', 'danger')
      );
    }
  }

  getDashboard() {
    this.dashboardService.getDashboards().subscribe(res => {
      this.dashboardInfo = res[0];
    }, error => {
      console.log(error);
    });
  }
}
