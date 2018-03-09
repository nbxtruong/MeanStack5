import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
@Component({
  selector: 'widget-header',
  templateUrl: './widget-header.component.html',
  styleUrls: ['./widget-header.component.scss']
})
export class WidgetHeaderComponent implements OnInit {

  @Input('name') name: string;
  @Output('editClick') edit = new EventEmitter();
  @Output('deleteClick') delete = new EventEmitter();
  @ViewChild('normal') normal: ElementRef;
  isCollapsed: boolean = false;
  constructor() { }

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

  ngOnInit() {
  }

  setEdit() {
    this.edit.emit();
  }

  setDelete() {
    this.delete.emit();
  }

  setCollapse(value: boolean) {
    this.isCollapsed = value;
  }

}
