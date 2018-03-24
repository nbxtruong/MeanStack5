// Import library
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { GridsterModule } from 'angular-gridster2';
import { ColorPickerModule } from 'ngx-color-picker';
import { ChartModule, HIGHCHARTS_MODULES } from 'angular-highcharts';
import more from 'highcharts/highcharts-more.src';
import exporting from 'highcharts/modules/exporting.src';
import { NgxGaugeModule } from 'ngx-gauge';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { BrowserModule } from '@angular/platform-browser';
import { AmazingTimePickerModule } from 'amazing-time-picker';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

export function highchartsModules() {
  // apply Highcharts Modules to this array
  return [more, exporting];
}

// Import service
import { CatService } from './services/cat.service';
import { UserService } from './services/user.service';
import { AuthService } from './services/auth.service';
import { AuthGuardLogin } from './services/auth-guard-login.service';
import { AuthGuardAdmin } from './services/auth-guard-admin.service';
import { DeviceService } from './services/device.service';
import { UtilService } from './services/util.service';
import { AppHttpClient } from './services/app-http.service';
import { DashboardService } from './services/dashboard.service';
import { WeatherService } from './services/weather-forecast.service';
import { RuleService } from './services/rule.service';
import { AppMqttService } from './services/app-mqtt.service';
import { ScheduleService } from './services/schedule.service';

// Import widgets component
import { LineGraphComponent } from './widget/line-graph/line-graph.component';
import { GaugeSeriesComponent } from './widget/gauge-series/gauge-series.component';
import { WeatherComponent } from './widget/weather-forecast/weather-forecast.component';
import { SwitchWidgetComponent } from './widget/switch-widget/switch-widget.component';
import { HightChartComponent } from './widget/high-charts/high-charts.component';

// Import pages component
import { AppComponent } from './app.component';
import { RoutingModule } from './routing.module';
import { SharedModule } from './shared/shared.module';
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
import { DeviceEditComponent } from './device/device-edit/device-edit.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RuleComponent } from './rule/rule.component';
import { AddWidgetComponent } from './add-widget/add-widget.component';
import { AddWidgetFormComponent } from './add-widget/add-widget-form/add-widget-form.component';
import { MqttComponent } from './mqtt/mqtt.component';
import { LinechartFormComponent } from './edit-widget-form/linechart-form/linechart-form.component';
import { GaugechartFormComponent } from './edit-widget-form/gaugechart-form/gaugechart-from.component';
import { AddDashboardComponent } from './add-dashboard/add-dashboard.component';
import { DeviceCardComponent } from './device/device-card/device-card.component';
import { DeviceEditDataComponent } from './device/device-edit-data/device-edit-data.component';
import { DashboardListComponent } from './dashboard/dashboard-list/dashboard-list.component';
import { FooterComponent } from './footer/footer.component';
import { WeatherFormComponent } from './edit-widget-form/weather-form/weather-form.component';
import { ScheduleListComponent } from './schedule-list/schedule-list.component';
import { ScheduleComponent } from './schedule-list/schedule/schedule.component';
import { SwitchFormComponent } from './edit-widget-form/switch-form/switch-form.component';
import { AddScheduleComponent } from './add-schedule/add-schedule.component';
import { FixedDailyComponent } from './add-schedule/fixed-daily/fixed-daily.component';
import { FixedIntervalComponent } from './add-schedule/fixed-interval/fixed-interval.component';
import { FlexibleDailyComponent } from './add-schedule/flexible-daily/flexible-daily.component';
import { GaugeChartComponent } from './widget/gauge-chart/gauge-chart.component';
import { WidgetHeaderComponent } from './widget/widget-header/widget-header.component';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

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
    GaugeSeriesComponent,
    RuleComponent,
    WeatherComponent,
    SwitchWidgetComponent,
    AddWidgetComponent,
    AddWidgetFormComponent,
    MqttComponent,
    LinechartFormComponent,
    HightChartComponent,
    GaugeChartComponent,
    GaugechartFormComponent,
    WidgetHeaderComponent,
    ScheduleListComponent,
    ScheduleComponent,
    SwitchFormComponent,
    AddDashboardComponent,
    AddScheduleComponent,
    FixedDailyComponent,
    FixedIntervalComponent,
    FlexibleDailyComponent,
    FooterComponent,
    WeatherFormComponent,
    DeviceCardComponent,
    DeviceEditDataComponent,
    DashboardListComponent
  ],
  imports: [
    NgxDatatableModule,
    RoutingModule,
    SharedModule,
    GridsterModule,
    ColorPickerModule,
    ChartModule,
    NgxGaugeModule,
    PerfectScrollbarModule,
    BrowserModule,
    AmazingTimePickerModule

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
    ScheduleService,
    { provide: HIGHCHARTS_MODULES, useFactory: highchartsModules },
    { provide: PERFECT_SCROLLBAR_CONFIG, useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG }
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})

export class AppModule { }