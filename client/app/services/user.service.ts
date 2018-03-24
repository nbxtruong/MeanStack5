import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { User } from '../shared/models/users.model';
import { of } from 'rxjs/observable/of';
import { UtilService } from './util.service';
import { AppHttpClient } from './app-http.service';
import { environment } from '../../environments/environment';

@Injectable()
export class UserService {

  apiUrl: String = environment.apiUrl;

  constructor(
    private appHttpClient: AppHttpClient,
    private util: UtilService,
    private httpClient: HttpClient
  ) { }

  register(user: User): Observable<User> {
    return this.httpClient.post<User>(this.apiUrl + 'users/signup', user);
  }

  login(credentials): Observable<any> {
    return this.httpClient.post<User>(this.apiUrl + 'users/login', credentials);
  }

  getUsers(): Observable<any> {
    return this.appHttpClient.get('users');
  }

  disableUser(user_id: String): Observable<any> {
    return this.appHttpClient.put('users/disable/' + user_id, null);
  }

  disableUsers(userID: String[]): Observable<any> {
    return this.appHttpClient.post('users/disableByIds', userID);
  }

  editProfile(user): Observable<any> {
    return this.appHttpClient.put("users/profile", user);
  }

  editPassword(change): Observable<any> {
    return this.appHttpClient.put("users/password", change);
  }

  enableUser(user_id: String): Observable<any> {
    return this.appHttpClient.put('users/enable/' + user_id, null);
  }

  enableUsers(userID: String[]): Observable<any> {
    return this.appHttpClient.post('users/enableByIds', userID);
  }
}
