import { Component, OnInit, AfterViewInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { UtilService } from '../services/util.service';
declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.scss']
})
export class NavigationBarComponent implements OnInit, AfterViewInit {

  email: String;

  constructor(
    private auth: AuthService,
    private util: UtilService
  ) { }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
  }
}
