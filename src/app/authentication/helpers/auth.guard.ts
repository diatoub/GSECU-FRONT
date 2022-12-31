import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';


@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    currentUserProfil: any | null = null; 
    constructor(
        private router: Router,
        private authService: AuthService
    ) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
         const user = this.authService.currentUserValue;
        
        if (user) {
            this.currentUserProfil = localStorage.getItem('profil');
            if (route.data.roles && route.data.roles.indexOf(this.currentUserProfil) === -1) {
                this.router.navigate(['/accueil']);
                return false;
            }
            return true;
        }
        this.router.navigate(['/authentication/login'], { queryParams: { returnUrl: state.url }});
        return false;
    }
}