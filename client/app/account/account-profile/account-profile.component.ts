import { Component, OnInit } from '@angular/core';
import { User } from '../../shared/models/users.model';
import { AuthService } from '../../services/auth.service';
import { Location } from '@angular/common';
import { UserService } from '../../services/user.service';
import { UtilService } from '../../services/util.service';
import { ToastComponent } from '../../shared/toast/toast.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account-profile',
  templateUrl: './account-profile.component.html',
  styleUrls: ['./account-profile.component.scss']
})
export class AccountProfileComponent implements OnInit {

  constructor(
    private router: Router,
    private auth: AuthService,
    private location: Location,
    private userService: UserService,
    public util: UtilService,
    public toast: ToastComponent
  ) { }

  user: User = {};

  ngOnInit() {
    Object.assign(this.user, this.auth.currentUser);
  }

  onSubmit() {
    let user: { id: string, name: string } = {
      id: this.user.id,
      name: this.user.name
    };
    this.util.isLoading = true;
    this.userService.editProfile(user).subscribe(res => {
      this.util.isLoading = false;
      this.toast.setMessage('Account updated successfully', 'success');
      setTimeout(() => { this.location.back() }, 1000);
    }, error => {
      console.log(error);
      this.util.isLoading = false;
      this.toast.setMessage('Failed to update account', 'danger');
    })
  }
}
