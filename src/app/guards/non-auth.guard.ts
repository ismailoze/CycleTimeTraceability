import {Injectable} from '@angular/core';
import {
    CanActivate,
    CanActivateChild,
    Route,
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
    UrlTree,
    Router
} from '@angular/router';
// import {AppService} from '@services/app.service';
import {Observable} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class NonAuthGuard implements CanActivate, CanActivateChild {
    constructor(
        private router: Router,
        // private appService: AppService
    ) {}

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ):
        | Observable<boolean | UrlTree>
        | Promise<boolean | UrlTree>
        | boolean
        | UrlTree {
            console.log('NonAuthGuard canActivate called');
        // if (!this.appService.user) {
        //     return true;
        // }
        this.router.navigate(['/dashboard']);
      return false;
    }
    canActivateChild(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ):
        | Observable<boolean | UrlTree>
        | Promise<boolean | UrlTree>
        | boolean
        | UrlTree {
            console.log('NonAuthGuard canActivateChild called');  // Log ekledik
        return this.canActivate(next, state);
    }
}
