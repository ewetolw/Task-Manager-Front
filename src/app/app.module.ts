import { AuthenticationGuard } from './auth/AuthenticationGuard';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProfilesComponent } from './home/profiles/profiles.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from './auth/login/login.component';
import { FormsModule } from '@angular/forms';
import { AuthService } from './auth/auth.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { BasicAuthInterceptor } from './auth/BasicAuthInterceptor';
import { AdminReqService } from './home/admin-req.service';
import { NewProfilesComponent } from './home/new-profiles/new-profiles/new-profiles.component';
import { ManagerHomeComponent } from './manager-home/manager-home.component';
import { ProblemsComponent } from './manager-home/problems/problems.component';
import { NewProblemsComponent } from './manager-home/new-problems/new-problems.component';
import { UnassignedProblemsComponent } from './manager-home/unassigned-problems/unassigned-problems.component';



@NgModule({
  declarations: [
    AppComponent,
    ProfilesComponent,
    LoginComponent,
    HomeComponent,
    NewProfilesComponent,
    ManagerHomeComponent,
    ProblemsComponent,
    NewProblemsComponent,
    UnassignedProblemsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [AuthService,
              AdminReqService,
              AuthenticationGuard,
              {
                provide: HTTP_INTERCEPTORS,
                useClass: BasicAuthInterceptor,
                multi: true
              }],
  bootstrap: [AppComponent]
})
export class AppModule { }
