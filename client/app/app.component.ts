import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { AppMqttService } from './services/app-mqtt.service';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { DashboardService } from './services/dashboard.service';
import { UtilService } from './services/util.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(
    public auth: AuthService,
    private mqtt: AppMqttService,
    private util: UtilService,
    private dashboardService: DashboardService
  ) { }

  ngOnInit(): void {
    this.util.dashboards.length = 0;
    this.dashboardService.getDashboards().subscribe(res => {
      this.util.dashboards = res;
    }, error => {
      console.log(error);
    })
  }
}
