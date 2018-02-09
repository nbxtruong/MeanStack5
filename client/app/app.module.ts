import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { RoutingModule } from './routing.module';
import { SharedModule } from './shared/shared.module';
import { CatService } from './services/cat.service';
import { UserService } from './services/user.service';
import { AuthService } from './services/auth.service';
import { AuthGuardLogin } from './services/auth-guard-login.service';
import { AuthGuardAdmin } from './services/auth-guard-admin.service';
import { AppComponent } from './app.component';
import { AboutComponent } from './about/about.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { AdminComponent } from './admin/admin.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { NavigationBarComponent } from './navigation-bar/navigation-bar.component';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { UserListComponent } from './user/user-list.component';
import { DeviceEditPropertiesComponent } from './device/device-edit-properties/device-edit-properties.component';
import { AccountProfileComponent } from './account/account-profile/account-profile.component';
import { AccountPasswordComponent } from './account/account-password/account-password.component';
import { AccountComponent } from './account/account/account.component';
import { DeviceListComponent } from './device/device-list/device-list.component';
import { DeviceService } from './services/device.service';
import { UtilService } from './services/util.service';
import { AppHttpClient } from './services/app-http.service';
import { DeviceEditComponent } from './device/device-edit/device-edit.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LineGraphComponent } from './widget/line-graph/line-graph.component';
import { GridsterModule } from 'angular-gridster2';
import { MetricComponent } from './widget/metric/metric.component';
import { RuleComponent } from './rule/rule.component';
import { DashboardService } from './services/dashboard.service';
import { WeatherComponent } from './widget/weather-forecast/weather-forecast.component';
import { WeatherService } from './services/weather-forecast.service';

@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    RegisterComponent,
    LoginComponent,
    LogoutComponent,
    AdminComponent,
    NotFoundComponent,
    NavigationBarComponent,
    BreadcrumbComponent,
    MainLayoutComponent,
    UserListComponent,
    DeviceEditPropertiesComponent,
    AccountProfileComponent,
    AccountPasswordComponent,
    AccountComponent,
    DeviceListComponent,
    DeviceEditComponent,
    DashboardComponent,
    LineGraphComponent,
    MetricComponent,
    RuleComponent,
    WeatherComponent,
  ],
  imports: [
    RoutingModule,
    SharedModule,
    GridsterModule
  ],
  providers: [
    AuthService,
    AuthGuardLogin,
    AuthGuardAdmin,
    CatService,
    UserService,
    DeviceService,
    UtilService,
    AppHttpClient,
    DashboardService,
    WeatherService
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})

export class AppModule { }
