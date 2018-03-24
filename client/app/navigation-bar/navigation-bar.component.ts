import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { UtilService } from '../services/util.service';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.scss']
})
export class NavigationBarComponent implements OnInit {


  email: String;
  constructor(
    public auth: AuthService,
    public util: UtilService,
    private router: Router
  ) { }
  dashboards: Array<{ id: string, name: string, timestamp: number }>;

  ngOnInit() {
    this.router.events.subscribe(event => {
      this.dashboards = this.util.getShowedDashboards();
    })
  }
}
