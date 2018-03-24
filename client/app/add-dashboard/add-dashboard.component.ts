import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../services/dashboard.service';
import { Location } from '@angular/common';
import { ToastComponent } from '../shared/toast/toast.component';
import { Router } from '@angular/router'
import { UtilService, Widget } from '../services/util.service';

@Component({
  selector: 'app-add-dashboard',
  templateUrl: './add-dashboard.component.html',
  styleUrls: ['./add-dashboard.component.scss']
})
export class AddDashboardComponent implements OnInit {
  dashboardData: any = {
    name: '',
    content: []
  };
  public hideFormInput = true;

  constructor(
    private dashboardService: DashboardService,
    private location: Location,
    public toast: ToastComponent,
    private router: Router,
    public util: UtilService
  ) { }

  ngOnInit() {
  }

  onSubmit() {
    this.hideFormInput = false
    this.util.isLoading = true;
    if (this.dashboardData.name) {
      this.dashboardService.createDashboards(this.dashboardData).subscribe(
        res => {
          this.util.isLoading = false;
          this.toast.setMessage('Dashboard created successfully!', 'success');
          this.router.navigate(['./dashboards/' + res.id]);
        },
        error => {
          this.util.isLoading = false;
          this.toast.setMessage('Failed to update device', 'danger')
        }
      );
    } else {
      this.toast.setMessage('Failed to update device', 'danger')
    }
  }

  onCancel() {
    this.router.navigate(['./dashboards']);
  }

}
