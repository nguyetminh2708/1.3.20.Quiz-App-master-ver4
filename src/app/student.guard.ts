import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class StudentGuard implements CanActivate {
   
  constructor(private router: Router) { }
  canActivate() {
    const user = JSON.parse(sessionStorage.getItem('user'));
    if (user['role'] === 'student') {
      return true;
    } else {
      this.router.navigateByUrl('/dashboard');
      return false;
    }
  }
}
