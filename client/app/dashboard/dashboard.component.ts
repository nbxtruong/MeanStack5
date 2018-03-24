import { Component, OnInit, ViewChildren, QueryList } from '@angular/core';
import { GridsterConfig, GridsterItem } from 'angular-gridster2';
import { DashboardService } from '../services/dashboard.service';
import { ToastComponent } from '../shared/toast/toast.component';
import { Observable } from 'rxjs/Rx';
import { UtilService, Widget } from '../services/util.service';
import { AfterViewInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { AppMqttService } from '../services/app-mqtt.service';
import { ActivatedRoute, Router } from '@angular/router';
import * as screenfull from 'screenfull';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, AfterViewInit {
  @ViewChildren('widget') widgets: QueryList<Widget>;

  isDeleting: boolean = false;
  isEdit: boolean = false;
  options: GridsterConfig;
  dashboardInfo: any = { name: "Loading..." };
  widgetsComponent: Array<Widget> = [];
  private sub: any;
  dashboardID: string;

  constructor(
    private dashboardService: DashboardService,
    public toast: ToastComponent,
    public util: UtilService,
    private mqtt: AppMqttService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.sub = this.route.params
      .subscribe(params => {
        if (!params.id) {
          this.getDashboards(false);
        } else {
          this.dashboardID = params.id;
          this.getDashboard(this.dashboardID);
        }
      });
    this.initDashboardOption();
  }

  ngAfterViewInit(): void {
    this.widgets.changes.subscribe(() => {
      this.widgetsComponent = this.widgets.toArray();
      this.widgets.forEach((widget) => {
        widget.getInvolvedGateways().forEach(deviceId => {
          let topic = this.mqtt.getUpdateTopic(deviceId);
          setTimeout(() => { this.mqtt.subscribe(topic, widget); }, 1000);
        });
      });
    })
  }

  static itemChange(item, itemComponent) {
  }

  static itemResize(item, itemComponent) {
  }

  initDashboardOption() {
    this.util.editMode = false;
    this.options = {
      itemChangeCallback: DashboardComponent.itemChange,
      itemResizeCallback: DashboardComponent.itemResize,
      gridType: 'scrollVertical',
      mobileBreakpoint: 640,
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
    this.isEdit = false;
    this.isDeleting = false;
    this.util.isLoading = true;

    this.dashboardService.saveDashboards(this.dashboardInfo.id, this.dashboardInfo).subscribe(
      res => {
        this.toast.setMessage('Dashboard updated successfully!', 'success');
        this.getDashboards(true);
        this.util.isLoading = false;
      },
      error => {
        this.util.isLoading = false;
        this.toast.setMessage('Failed to update dashboard', 'danger');
      }
    );
    this.widgetsComponent.forEach(component => {
      component.update("");
    });
  }

  getDashboards(afterRename: boolean) {
    this.util.dashboards.length = 0;
    this.dashboardService.getDashboards().subscribe(res => {
      if (afterRename === true) {
        this.util.dashboards = res;
        this.addUtilWidget();
      } else {
        this.util.dashboards = res;
        this.addUtilWidget();
        this.dashboardInfo = res[0];
      }
    }, error => {
      console.log(error);
    });
  }

  getDashboard(id) {
    this.dashboardService.getDashboard(id).subscribe(res => {
      this.dashboardInfo = res;
      this.addUtilWidget();
      this.getDashboards(true);
    }, error => {
      console.log(error);
    });
  }

  editIndex(event, idx) {
    this.dashboardInfo.content[idx] = event;
    this.saveDashboards();
  }

  setDelete(value: boolean) {
    this.isDeleting = value;
  }

  setEdit(value: boolean) {
    this.isEdit = value;
  }

  deleteDashboard() {
    this.isEdit = false;
    this.isDeleting = false;
    this.util.isLoading = true;

    this.dashboardService.deleteDashboards((this.dashboardInfo.id)).subscribe(res => {
      this.util.isLoading = false;
      this.util.removeRecentDashboard(this.dashboardInfo.id);
      this.router.navigate(['./dashboards']);
    }, error => {
      this.util.isLoading = false;
      console.log(error);
    });
  }

  fullScreenArea() {
    const el = document.getElementById('fullScreenArea');

    if (screenfull.enabled) {
      screenfull.request(el);
    }
  }

  // unsubscribe to avoid memory leaks
  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
