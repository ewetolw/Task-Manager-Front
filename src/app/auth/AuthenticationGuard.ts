import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class AuthenticationGuard implements CanActivate {

    private role: string;

    constructor(private router: Router) { }


    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        this.role = sessionStorage.getItem('role');
        console.log('rout to page: ' + route.url.toString() + ' for role ' + this.role);
        if (this.role && route.url.toString().search(this.role)) {
          return true;
        }
        // not logged in so redirect to login page with the return url
        this.router.navigate([''], { queryParams: { returnUrl: state.url }});

        return false;
    }
}
