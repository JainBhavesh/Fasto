import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements CanActivate {

  constructor(public router: Router) { }

  canActivate() {
    const chkLogin: any = localStorage.isLogin; // get Login flag
    if (chkLogin === 'true') {
      return true;
    } else {
      this.router.navigate(['login']);
      return false;
    }
  }
}
