import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';
import { JwtHelper } from 'angular2-jwt';

@Injectable()
export class AuthGuardLogin implements CanActivate {

  jwtHelper: JwtHelper = new JwtHelper();

  constructor(public auth: AuthService, private router: Router) { }

  canActivate() {
    const token = localStorage.getItem('token');

    if ((this.auth.loggedIn) && (token !== null) && (this.jwtHelper.isTokenExpired(token) === false)) { return true; } else {
      localStorage.removeItem('token');
      this.router.navigate(['/login']);
      return false;
    }
  }
}
