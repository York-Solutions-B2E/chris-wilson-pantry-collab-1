import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthenticationService } from './Services/Authtication/authentication.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthenticationService, private router: Router) {}

  canActivate(): boolean {
    console.log("user: ", this.auth.IsLoggedIn())
    if (!this.auth.IsLoggedIn()) {
      this.router.navigate(['/login']);

      return false;
    }
    return true;
  }
}