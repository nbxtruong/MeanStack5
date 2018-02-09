import { Component, Input } from '@angular/core';
import { UtilService } from '../../services/util.service';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent {

  @Input() content: String;
  constructor(public util: UtilService) { }
}
