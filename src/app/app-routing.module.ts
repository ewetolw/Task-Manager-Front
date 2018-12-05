import { ProfilesComponent } from './home/profiles/profiles.component';
import { AuthenticationGuard } from './auth/AuthenticationGuard';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './auth/login/login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'admin',
    component: HomeComponent,
    canActivate: [AuthenticationGuard]
  },
  {
    path: 'worker',
    component: HomeComponent,
    canActivate: [AuthenticationGuard]
  },
  {
    path: 'manager',
    component: HomeComponent,
    canActivate: [AuthenticationGuard]
  },
  {
    path: 'profiles',
    component: ProfilesComponent
  },
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
