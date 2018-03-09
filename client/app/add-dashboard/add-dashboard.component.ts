import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../services/dashboard.service';
import { Location } from '@angular/common';
import { ToastComponent } from '../shared/toast/toast.component';

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

  constructor(
    private dashboardService: DashboardService,
    private location: Location,
    public toast: ToastComponent
  ) { }

  ngOnInit() {
  }

  onSubmit() {
    if (this.dashboardData.name) {
      this.dashboardService.createDashboards(this.dashboardData).subscribe(
        res => {
          this.toast.setMessage('Dashboard created successfully!', 'success');
          this.location.back();
        },
        error => {
          this.toast.setMessage('Failed to update device', 'danger')
        }
      );
    } else {
      this.toast.setMessage('Failed to update device', 'danger')
    }
  }

  onCancel() {
    this.location.back();
  }

}
