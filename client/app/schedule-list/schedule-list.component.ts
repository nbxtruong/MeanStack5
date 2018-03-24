import { Component, OnInit } from '@angular/core';
import { ScheduleService } from '../services/schedule.service';
import { Schedule, ScheduleFactory } from '../shared/schedule';
import { UtilService } from '../services/util.service';
import { ToastComponent } from '../shared/toast/toast.component';
import { Router } from '@angular/router';

@Component({
  selector: 'schedule-list',
  templateUrl: './schedule-list.component.html',
  styleUrls: ['./schedule-list.component.scss']
})
export class ScheduleListComponent implements OnInit {

  constructor(
    private scheduleService: ScheduleService,
    public util: UtilService,
    public toast: ToastComponent,
    private router: Router
  ) { }
  searchSchedule: string;
  schedules: Schedule[] = [];
  ngOnInit() {
    this.util.isLoading = true;
    this.scheduleService.getSchedules().subscribe(res => {
      this.util.isLoading = false;
      res.forEach(element => {
        let madeSchedule = ScheduleFactory.makeSchedule(element);
        if (madeSchedule != null)
          this.schedules.push(madeSchedule);
      });
    }, error => {
      this.util.isLoading = false;
      console.log(error);
    })
  }

  updateSchedule(targettedSchedule) {
    this.scheduleService.isEditting = true;
    this.scheduleService.schedule = targettedSchedule;
    this.router.navigate(["edit-schedule"]);
  }

  deleteSchedule(deletedSchedule) {
    this.util.isLoading = true;
    this.scheduleService.deleteSchedule(deletedSchedule.id).subscribe(res => {
      this.util.isLoading = false;
      this.toast.setMessage('Schedule deleted successfully!', 'success');
      this.schedules = this.schedules.filter(schedule => { return schedule.id != deletedSchedule.id })
    }, error => {
      this.util.isLoading = false;
      console.log(error);
      this.toast.setMessage('Failed to delete schedule', 'danger');
    });
  }

}
