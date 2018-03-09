import { Injectable } from '@angular/core';
import { UtilService } from './util.service';
import { of } from 'rxjs/observable/of';
import { AppHttpClient } from './app-http.service';

@Injectable()
export class DashboardService {

  constructor(
    public util: UtilService,
    public http: AppHttpClient
  ) { }

  getDashboards() {
    return this.http.get("dashboards");
  }

  getDashboard(id: string) {
    return this.http.get("dashboards/" + id);
  }

  saveDashboards(dashboardID: String, dashboardData: Object) {
    return this.http.put("dashboards/" + dashboardID, dashboardData);
  }

  createDashboards(dashboardData: Object) {
    return this.http.post("dashboards/", dashboardData);
  }

  deleteDashboards(dashboardID: String) {
    return this.http.delete("dashboards/" + dashboardID);
  }

}
