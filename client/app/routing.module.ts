import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AboutComponent } from './about/about.component';
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

import { AuthGuardLogin } from './services/auth-guard-login.service';
import { AuthGuardAdmin } from './services/auth-guard-admin.service';

const routes: Routes = [
  { path: '', redirectTo: 'device-list', pathMatch: 'full' },
  { path: 'device-list', component: DeviceListComponent, data: { breadcrumb: "Device list" }, canActivate: [AuthGuardLogin] },
  { path: 'users', component: UserListComponent, data: { breadcrumb: "User" }, canActivate: [AuthGuardLogin] },
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
  { path: '**', redirectTo: '/notfound' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class RoutingModule { }
