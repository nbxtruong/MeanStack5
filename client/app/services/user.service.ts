import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { User } from '../shared/models/user.model';
import { of } from 'rxjs/observable/of';

@Injectable()
export class UserService {

  constructor(private http: HttpClient) { }

  register(user: User): Observable<User> {
    //return this.http.post<User>(this.API_URL + '/users/signup', user);
    return of();
  }

  login(credentials): Observable<any> {
    //return this.http.post<any>(this.API_URL + '/users/login', credentials);
    return of();
  }

  getUsers(): Observable<User[]> {
    //return this.http.get<User[]>(this.API_URL + '/users');
    return of();
  }

  countUsers(): Observable<number> {
    //return this.http.get<number>('/api/users/count');
    return of();
  }

  addUser(user: User): Observable<User> {
    //return this.http.post<User>('/api/user', user);
    return of();
  }

  getUser(user: User): Observable<User> {
    //return this.http.get<User>(`/api/user/${user._id}`);
    return of();
  }

  editUser(user: User): Observable<string> {
    //return this.http.put(`/api/user/${user._id}`, user, { responseType: 'text' });
    return of();
  }

  deleteUser(user: User): Observable<string> {
    //return this.http.delete(`/api/user/${user._id}`, { responseType: 'text' });
    return of();
  }
}
