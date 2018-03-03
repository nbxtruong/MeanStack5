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

import { AuthGuardLogin } from './services/auth-guard-login.service';
import { AuthGuardAdmin } from './services/auth-guard-admin.service';
import { LineGraphComponent } from './widget/line-graph/line-graph.component';
import { MetricComponent } from './widget/metric/metric.component';
import { WeatherComponent } from './../app/widget/weather-forecast/weather-forecast.component';
import { SwitchWidgetComponent } from './../app/widget/switch-widget/switch-widget.component';
import { AddWidgetComponent } from './add-widget/add-widget.component';
import { MqttComponent } from './mqtt/mqtt.component';

const routes: Routes = [
  { path: '', redirectTo: 'dashboards', pathMatch: 'full' },
  { path: 'dashboards', component: DashboardComponent, data: { breadcrumb: "Dashboard" }, canActivate: [AuthGuardLogin] },
  { path: 'devices', component: DeviceListComponent, data: { breadcrumb: "Device list" }, canActivate: [AuthGuardLogin] },
  { path: 'users', component: UserListComponent, data: { breadcrumb: "User" }, canActivate: [AuthGuardLogin] },
  { path: 'rules', component: RuleComponent, canActivate: [AuthGuardLogin] },
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
        { path: 'properties', component: DeviceEditPropertiesComponent, data: { breadcrumb: "Device properties" } }
      ], canActivate: [AuthGuardLogin]
  },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LogoutComponent, canActivate: [AuthGuardLogin] },
  { path: 'admin', component: AdminComponent, canActivate: [AuthGuardLogin] },
  { path: 'notfound', component: NotFoundComponent },
  { path: 'add-widget', component: AddWidgetComponent },
  { path: '**', redirectTo: '/notfound' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})

export class RoutingModule { }
