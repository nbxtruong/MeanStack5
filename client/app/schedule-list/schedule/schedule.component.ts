import { Component, OnInit, ViewChild, ElementRef, Input, EventEmitter, Output } from '@angular/core';
import { Schedule } from '../../shared/schedule';
import { ScheduleService } from '../../services/schedule.service';

@Component({
  selector: 'schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss']
})
export class ScheduleComponent implements OnInit {

  @ViewChild('normal') normal: ElementRef;
  @Input('schedule') schedule: Schedule
  @Output('onDelete') onDelete = new EventEmitter;
  @Output('onUpdate') onUpdate = new EventEmitter;

  isCollapsed: boolean = false;
  FIXED_DAILY: string = Schedule.FIXED_DAILY;
  FIXED_INTERVAL: string = Schedule.FIXED_INTERVAL;
  FLEXIBLE_DAILY: string = Schedule.FLEXIBLE_DAILY;
  content: any;
  enabled: boolean;
  isDeleting: boolean = false;

  constructor(
    private scheduleService: ScheduleService
  ) { }

  ngOnInit() {
    this.content = this.schedule.getContent();
    this.enabled = !(this.schedule.is_disabled);
  }

  ngDoCheck() {
    if (this.normal) {
      if (this.normal.nativeElement.offsetWidth < 100) {
        this.isCollapsed = true;
      }
      else {
        this.isCollapsed = false;
      }
    }
  }

  onControlChange() {
    if (this.enabled) {
      this.scheduleService.statusEnable(this.schedule.id).subscribe(res => {
      }, error => {
        console.log(error);
      });
    }
    else {
      this.scheduleService.statusDisable(this.schedule.id).subscribe(res => {
      }, error => {
        console.log(error);
      });
    }
  }

  setDelete(value: boolean) {
    this.isDeleting = value;
  }

  setEdit() {
    this.onUpdate.emit(this.schedule);
  }

  deleteClick() {
    this.setDelete(false);
    this.onDelete.emit(this.schedule);
  }

}
