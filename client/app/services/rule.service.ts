
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { Router, ActivatedRoute } from '@angular/router';
import { ToastComponent } from '../shared/toast/toast.component';
import { environment } from '../../environments/environment';
import { Device } from '../shared/models/device.model';
import { UtilService } from './util.service';
import { AppHttpClient } from './app-http.service';

@Injectable()
export class RuleService {
  apiUrl: String = environment.apiUrl;

  constructor(
    private router: Router,
    public toast: ToastComponent,
    private http: AppHttpClient
  ) { }

  createRule(ruleRequest: Object): Observable<any> {
    return this.http.post('rules', ruleRequest);
  }
  getRules(): Observable<any> {
    return this.http.get('rules');
  }
  updateRule(ruleID, ruleContent): Observable<any> {
    return this.http.put('rules/' + ruleID, ruleContent);
  }
  deleteRule(ruleID): Observable<any> {
    return this.http.delete('rules/' + ruleID);
  }
  getAttributes(): Observable<any> {
    return this.http.get('devices/getAttributes/Sensor');
  }
}
