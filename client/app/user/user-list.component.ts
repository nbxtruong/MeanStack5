import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import 'datatables.net';
import { UserService } from '../services/user.service';
import { AuthService } from '../services/auth.service';
import { UtilService } from '../services/util.service';
import { User } from '../shared/models/users.model';
@Component({
  selector: 'user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  token: String = localStorage.getItem('token');
  users: User[];
  checkedUser: User;

  idsToDisable: Set<String> = new Set<String>();
  idsToEnable: Set<String> = new Set<String>();
  dummyUser: User = new User();
  tableInitiated: boolean = false;
  table: any;

  constructor(private userService: UserService,
    private auth: AuthService,
    public util: UtilService
  ) { }

  initDatatable() {
    const ngThis = this;
    this.tableInitiated = true;
    $(document).ready(function () {
      ngThis.table = $('#datatable').DataTable({
        stateSave: true,
        pagingType: 'full_numbers',
        dom: '<"top"fB>rt<"bottom"ipl>',
        order: [[1, "asc"]],
        columnDefs: [
          { orderable: false, targets: [0, 4] },
          {
            targets: 0,
            searchable: false,
            orderable: false,
            className: 'dt-center'
          }
        ],
        language: {
          search: '_INPUT_',
          searchPlaceholder: 'Search by name',
          zeroRecords: 'Nothing found - sorry',
          info: 'Show _START_ to _END_ of _TOTAL_ items',
          lengthMenu: '_MENU_ per page',
          paginate: {
            previous: '<i class="fa fa-angle-left" aria-hidden="true"></i>',
            next: '<i class="fa fa-angle-right" aria-hidden="true"></i>',
            first: '|<i class="fa fa-angle-left" aria-hidden="true"></i>',
            last: '<i class="fa fa-angle-right" aria-hidden="true"></i>|'
          }
        },
      });
    });
  }

  ngOnInit() {
    this.util.isLoading = true;
    this.getListUsers();
    this.checkedUser = this.dummyUser;
  }
  getListUsers() {
    this.userService.getUsers().subscribe(
      res => {
        this.util.isLoading = false;
        this.users = res;
        if (!this.tableInitiated) {
          this.initDatatable();
        } else {
          this.table.clear().draw();
          this.table.destroy();
          this.initDatatable();
        }
      },
      error => {
        this.util.isLoading = false;
        console.log(error);
      }
    );
  }

  checkAllChanged(event: any) {
    const id = event.target.value;
    if (event.target.checked) {
      this.users.forEach((user: User) => {
        if (user.activated) {
          this.idsToDisable.add(user.id);
        }
        else {
          this.idsToEnable.add(user.id);
        }
        $("input[value=" + user.id + "]").prop("checked", true);
      });
    } else {
      this.users.forEach((user: User) => {
        if (user.activated) {
          this.idsToDisable.delete(user.id);
        }
        else {
          this.idsToEnable.delete(user.id);
        }
        $("input[value=" + user.id + "]").prop("checked", false);
      });
    }
  }
  checkboxChanged(event: any) {
    const id = event.target.value;
    this.users.forEach((user: User) => {
      if (user.id === id) {
        if (event.target.checked) {
          if (user.activated) {
            this.idsToDisable.add(id);
          }
          else {
            this.idsToEnable.add(id);
          }
        }
        else {
          if (user.activated) {
            this.idsToDisable.delete(id);
          }
          else {
            this.idsToEnable.delete(id);
          }
        }
      }
    });
  }

  disableUser() {
    this.util.isLoading = true;
    this.userService.disableUser(this.checkedUser.id).subscribe(
      res => {
        this.getListUsers();
        this.util.isLoading = false;
      },
      error => {
        console.log(error);
      }
    );
  }

  disableUsers() {
    this.util.isLoading = true;
    let disabledUserIds: String[] = Array.from(this.idsToDisable);
    this.userService.disableUsers(disabledUserIds).subscribe(
      res => {
        this.getListUsers();
        this.idsToDisable.clear();
      },
      error => {
        console.log(error);
      }
    );
  }

  setDisableUser(user) {
    this.checkedUser = user;
  }

  enableUser() {
    this.util.isLoading = true;
    this.userService.enableUser(this.checkedUser.id).subscribe(
      res => {
        this.getListUsers();
        this.util.isLoading = false;
      },
      error => {
        console.log(error);
      }
    );
  }

  enableUsers() {
    this.util.isLoading = true;
    let enabledUserIds: String[] = Array.from(this.idsToEnable);
    this.userService.enableUsers(enabledUserIds).subscribe(
      res => {
        this.getListUsers();
        this.idsToEnable.clear();
      },
      error => {
        console.log(error);
      }
    );
  }

  setEnableUser(user) {
    this.checkedUser = user;
  }
}
