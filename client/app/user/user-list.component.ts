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
  userToDelete: User;
  idsToDelete: Set<String> = new Set<String>();
  enableDeleteButton: Boolean = true;
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
        order: [[ 1, "asc" ]],
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
        console.log(error);
      }
    );
  }

  checkAllChanged(event: any) {
    const id = event.target.value;
    if (event.target.checked) {
      this.users.forEach((user: User) => {
        this.idsToDelete.add(user.id);
        $("input[value=" + user.id + "]").prop("checked", true);
      });
    } else {
      this.users.forEach((user: User) => {
        this.idsToDelete.delete(user.id);
        $("input[value=" + user.id + "]").prop("checked", false);
      });
    }
  }
  checkboxChanged(event: any) {
    const id = event.target.value;
    if (event.target.checked) {
      this.idsToDelete.add(id);
    } else {
      this.idsToDelete.delete(id);
    }
  }
}
