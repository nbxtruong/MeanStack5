import { Injectable } from '@angular/core';
import { UtilService } from './util.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../environments/environment';

@Injectable()
export class AppHttpClient {

  apiUrl: String = environment.apiUrl;

  constructor(
    private http: HttpClient,
    private util: UtilService
  ) { }

  createHeader() {
    let token = localStorage.getItem('token');
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': '' + token + '' });
    return headers
  }

  get(url): Observable<any> {
    let headers = this.createHeader();
    return this.http.get(this.apiUrl + url, {
      headers: headers
    });
  }

  post(url, data): Observable<any> {
    let headers = this.createHeader();
    return this.http.post(this.apiUrl + url, data, {
      headers: headers
    });
  }

  delete(url): Observable<any> {
    let headers = this.createHeader();
    return this.http.delete(this.apiUrl + url, {
      headers: headers
    });
  }

  deletes(url, data): Observable<any> {
    let headers = this.createHeader();
    return this.http.post(this.apiUrl + url, data, {
      headers: headers
    });
  }
}