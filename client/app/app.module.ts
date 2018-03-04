import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { RoutingModule } from './routing.module';
import { SharedModule } from './shared/shared.module';
import { CatService } from './services/cat.service';
import { UserService } from './services/user.service';
import { AuthService } from './services/auth.service';
import { AuthGuardLogin } from './services/auth-guard-login.service';
import { AuthGuardAdmin } from './services/auth-guard-admin.service';
import { AppComponent } from './app.component';
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
import { GridsterModule } from 'angular-gridster2';
import { RuleComponent } from './rule/rule.component';
import { DashboardService } from './services/dashboard.service';
import { WeatherService } from './services/weather-forecast.service';
import { RuleService } from './services/rule.service';
import { AddWidgetComponent } from './add-widget/add-widget.component';
import { ColorPickerModule } from 'ngx-color-picker';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { WidgetFormComponent } from './add-widget/widget-form/widget-form.component';
import { MqttComponent } from './mqtt/mqtt.component';
import { AppMqttService } from './services/app-mqtt.service';
import { LinechartFormComponent } from './widget-form/linechart-form/linechart-form.component';
import { ChartModule, HIGHCHARTS_MODULES } from 'angular-highcharts';
import more from 'highcharts/highcharts-more.src';
import exporting from 'highcharts/modules/exporting.src';

// Import widgets component
import { LineGraphComponent } from './widget/line-graph/line-graph.component';
import { MetricComponent } from './widget/metric/metric.component';
import { WeatherComponent } from './widget/weather-forecast/weather-forecast.component';
import { SwitchWidgetComponent } from './widget/switch-widget/switch-widget.component';
import { HightChartComponent } from './widget/high-charts/high-charts.component';

export function highchartsModules() {
  // apply Highcharts Modules to this array
  return [more, exporting];
}

@NgModule({
  declarations: [
    AppComponent,
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
    SwitchWidgetComponent,
    AddWidgetComponent,
    WidgetFormComponent,
    MqttComponent,
    LinechartFormComponent,
    HightChartComponent
  ],
  imports: [
    RoutingModule,
    SharedModule,
    GridsterModule,
    ColorPickerModule,
    ChartModule
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
    WeatherService,
    AppMqttService,
    RuleService,
    { provide: HIGHCHARTS_MODULES, useFactory: highchartsModules }
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})

export class AppModule { }
