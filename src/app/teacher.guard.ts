import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TeacherGuard implements CanActivate {
  constructor(private router: Router) { }
  canActivate() {
    const user = JSON.parse(sessionStorage.getItem('user'));
    if (user['role'] === 'teacher') {
      return true;
    } else {
      this.router.navigateByUrl('/home');
      return false;
    }
  }
}
