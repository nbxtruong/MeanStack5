import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { UtilService } from '../../services/util.service';
import { ToastComponent } from '../../shared/toast/toast.component';
import { Location } from '@angular/common';
import { User } from '../../shared/models/users.model';

@Component({
  selector: 'app-account-password',
  templateUrl: './account-password.component.html',
  styleUrls: ['./account-password.component.scss']
})
export class AccountPasswordComponent implements OnInit {

  constructor(
    private auth: AuthService,
    private location: Location,
    private userService: UserService,
    public util: UtilService,
    public toast: ToastComponent
  ) { }

  user: User = {};
  change = {
    old: "",
    new: "",
    retype: ""
  };

  ngOnInit() {
    Object.assign(this.user, this.auth.currentUser);
  }

  onSubmit() {
    if (this.change.new === this.change.retype) {
      let newUser = {
        id: this.user.id,
        password: this.change.old,
        new_password: this.change.new
      }
      this.util.isLoading = true;
      this.userService.editPassword(newUser).subscribe(res => {
        this.util.isLoading = false;
        this.toast.setMessage("Password updated successfully", "success");
      }, error => {
        this.util.isLoading = false;
        this.toast.setMessage("The old password is not correct", "danger");
        console.log(error);
      })
    }
    else {
      this.toast.setMessage("The retyped password is not correct", "danger");
    }
  }
}
