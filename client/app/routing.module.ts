import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { AdminComponent } from './admin/admin.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { UserListComponent } from './user/user-list.component';
import { DeviceEditPropertiesComponent } from './device/device-edit-properties/device-edit-properties.component';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { AccountProfileComponent } from './account/account-profile/account-profile.component';
import { AccountPasswordComponent } from './account/account-password/account-password.component';
import { AccountComponent } from './account/account/account.component';
import { DeviceListComponent } from './device/device-list/device-list.component';
import { DeviceEditComponent } from './device/device-edit/device-edit.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RuleComponent } from './rule/rule.component';
import { AddDashboardComponent } from './add-dashboard/add-dashboard.component';
import { AuthGuardLogin } from './services/auth-guard-login.service';
import { AuthGuardAdmin } from './services/auth-guard-admin.service';
import { WeatherComponent } from './../app/widget/weather-forecast/weather-forecast.component';
import { SwitchWidgetComponent } from './../app/widget/switch-widget/switch-widget.component';
import { AddWidgetComponent } from './add-widget/add-widget.component';
import { MqttComponent } from './mqtt/mqtt.component';
import { ScheduleListComponent } from './schedule-list/schedule-list.component';
import { AddScheduleComponent } from './add-schedule/add-schedule.component';
import { FixedDailyComponent } from './add-schedule/fixed-daily/fixed-daily.component';
import { FixedIntervalComponent } from './add-schedule/fixed-interval/fixed-interval.component';
import { FlexibleDailyComponent } from './add-schedule/flexible-daily/flexible-daily.component';
import { DeviceEditDataComponent } from './device/device-edit-data/device-edit-data.component';
import { DashboardListComponent } from './dashboard/dashboard-list/dashboard-list.component';

const routes: Routes = [
  { path: '', redirectTo: 'dashboards', pathMatch: 'full' },
  { path: 'dashboards', component: DashboardListComponent, data: { breadcrumb: "Dashboards" }, canActivate: [AuthGuardLogin] },
  { path: 'dashboards/:id', component: DashboardComponent, data: { breadcrumb: "Dashboard" }, canActivate: [AuthGuardLogin] },
  { path: 'addDashboard', component: AddDashboardComponent, data: { breadcrumb: "Add Dashboard" }, canActivate: [AuthGuardLogin] },
  { path: 'devices', component: DeviceListComponent, data: { breadcrumb: "Device list" }, canActivate: [AuthGuardLogin] },
  { path: 'users', component: UserListComponent, data: { breadcrumb: "User" }, canActivate: [AuthGuardLogin] },
  { path: 'rules', component: RuleComponent, canActivate: [AuthGuardLogin] },
  { path: 'schedule', component: ScheduleListComponent, canActivate: [AuthGuardLogin] },
  {
    path: 'account', component: AccountComponent, children:
      [
        { path: '', redirectTo: 'profile', pathMatch: 'full' },
        { path: 'profile', component: AccountProfileComponent, data: { breadcrumb: "Profile" } },
        { path: 'password', component: AccountPasswordComponent, data: { breadcrumb: "Password" } }
      ], canActivate: [AuthGuardLogin]
  },
  {
    path: 'devices/:id', component: DeviceEditComponent, data: { breadcrumb: "Devices" }, children:
      [
        { path: '', redirectTo: 'properties', pathMatch: 'full' },
        { path: 'properties', component: DeviceEditPropertiesComponent, data: { breadcrumb: "Device properties" } },
        { path: 'data', component: DeviceEditDataComponent }
      ], canActivate: [AuthGuardLogin]
  },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LogoutComponent, canActivate: [AuthGuardLogin] },
  { path: 'admin', component: AdminComponent, canActivate: [AuthGuardLogin] },
  { path: 'notfound', component: NotFoundComponent },
  { path: 'add-widget', component: AddWidgetComponent },
  { path: 'add-schedule', component: AddScheduleComponent, canActivate: [AuthGuardLogin] },
  { path: 'edit-schedule', component: AddScheduleComponent, canActivate: [AuthGuardLogin] },
  { path: '**', redirectTo: '/notfound' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})

export class RoutingModule { }
