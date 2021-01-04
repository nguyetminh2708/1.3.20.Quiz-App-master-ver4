import { Component, OnInit, OnChanges } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceLocal } from '../service/auth.servicelocal';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit,OnChanges  {

  loggedIn = false;

  constructor(private router: Router, private authServiceLocal: AuthServiceLocal) { }

  ngOnInit() {
    this.loggedIn = this.authServiceLocal.loggedIn();
  }

  ngOnChanges() {
    this.loggedIn = this.authServiceLocal.loggedIn();
  }

  logout(){
    sessionStorage.clear();
    this.router.navigateByUrl('/login');
  }

}
