import { Component, OnInit } from '@angular/core';
import { UtilService } from '../../services/util.service';
import { DashboardService } from '../../services/dashboard.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard-list',
  templateUrl: './dashboard-list.component.html',
  styleUrls: ['./dashboard-list.component.scss']
})
export class DashboardListComponent implements OnInit {

  rows: Array<{ name: string, last_updated: string, data: any }> = [];
  columns = [
    { prop: 'name' },
    { prop: 'last_updated', name: 'Last Updated' }
  ];

  constructor(
    public util: UtilService,
    private dashboardService: DashboardService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getDashboards();
  }

  getDashboards() {
    this.util.isLoading = true;
    this.dashboardService.getDashboards().subscribe(res => {
      res.forEach(dashboard => {
        this.rows.push({
          name: dashboard.name,
          last_updated: new Date(dashboard.last_updated).toLocaleString(),
          data: { id: dashboard.id }
        });
      });
      this.util.isLoading = false;
      this.rows = [...this.rows];
    }, error => {
      this.util.isLoading = false;
      console.log(error);
    })
  }

  onTableActivate(event) {
    if (event.type === "click") {
      let id = event.row.data.id;
      if (id) {
        this.util.addRecentDashboard(id, event.row.name);
        this.router.navigate(["/dashboards", id]);
      }
    }
  }

}
