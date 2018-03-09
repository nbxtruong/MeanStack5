import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelper } from 'angular2-jwt';

import { UserService } from './user.service';
import { User } from '../shared/models/users.model';

import 'rxjs/add/operator/map';
import { environment } from '../../environments/environment';
import { constants } from '../constants';
@Injectable()
export class AuthService {
  loggedIn = false;
  isAdmin = false;

  jwtHelper: JwtHelper = new JwtHelper();
  currentUser: User = new User();

  constructor(private userService: UserService,
    private router: Router) {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedUser = this.decodeUserFromToken(token);
      this.setCurrentUser(decodedUser);
    }
  }

  login(emailAndPassword) {
    return this.userService.login(emailAndPassword).map(
      res => {
        localStorage.setItem('token', res.token);
        const decodedUser = this.decodeUserFromToken(res.token);
        this.setCurrentUser(decodedUser);
        return this.loggedIn;
      }
    );
  }

  logout() {
    localStorage.removeItem('token');
    this.loggedIn = false;
    this.isAdmin = false;
    this.currentUser = new User();
    this.router.navigate(['/']);
  }

  decodeUserFromToken(token) {
    return this.jwtHelper.decodeToken(token).user;
  }

  setCurrentUser(decodedUser) {
    this.loggedIn = true;
    this.currentUser.id = decodedUser.id;
    this.currentUser.email = decodedUser.email;
    this.currentUser.name = decodedUser.name;
    this.currentUser.auth_key=decodedUser.auth_key;
    this.isAdmin = (decodedUser.role === constants.ROLE_ADMIN);
  }

}
