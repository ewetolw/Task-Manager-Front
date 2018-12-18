import { ProfilesComponent } from './home/profiles/profiles.component';
import { AuthenticationGuard } from './auth/AuthenticationGuard';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './auth/login/login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ManagerHomeComponent } from './manager-home/manager-home.component';
import { WorkerHomeComponent } from './worker-home/worker-home.component';


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
    component: WorkerHomeComponent,
    canActivate: [AuthenticationGuard]
  },
  {
    path: 'manager',
    component: ManagerHomeComponent,
    canActivate: [AuthenticationGuard]
  },
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
