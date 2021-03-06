import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { AuthService } from '../services/auth.service';
import { ToastComponent } from '../shared/toast/toast.component';
import { UtilService } from '../services/util.service';
import { constants } from '../constants';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  email = new FormControl('', [
    Validators.required,
    Validators.minLength(3),
    Validators.maxLength(100)
  ]);
  password = new FormControl('', [
    Validators.required,
    Validators.minLength(6)
  ]);

  constructor(private auth: AuthService,
    private formBuilder: FormBuilder,
    private router: Router,
    public toast: ToastComponent,
    public util: UtilService
  ) { }

  ngOnInit() {
    if (this.auth.loggedIn) {
      this.router.navigate(['/dashboards']);
    }
    this.loginForm = this.formBuilder.group({
      email: this.email,
      password: this.password
    });
  }

  setClassEmail() {
    return { 'has-danger': !this.email.pristine && !this.email.valid };
  }

  setClassPassword() {
    return { 'has-danger': !this.password.pristine && !this.password.valid };
  }

  login() {
    this.util.isLoading = true;
    this.auth.login(this.loginForm.value).subscribe(
      res => {
        if (localStorage.getItem(constants.localStorage.recent_dashboards)) {
          this.util.recentDashboards = JSON.parse(localStorage.getItem(constants.localStorage.recent_dashboards));
        }
        this.router.navigate(['/dashboards']);
        this.util.isLoading = false;
      },
      error => {
        this.loginForm.reset();
        this.toast.setMessage('invalid email or password!', 'danger');
        this.util.isLoading = false;
      }
    );
  }

}
