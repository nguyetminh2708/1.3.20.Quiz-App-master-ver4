import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServiceLocal } from '../service/auth.servicelocal';
import { SocialAuthService } from "angularx-social-login";
import { FacebookLoginProvider, GoogleLoginProvider } from "angularx-social-login";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup;


  constructor(private fb: FormBuilder,
    private authServiceLocal: AuthServiceLocal,
    private router: Router,
    private authService: SocialAuthService) {
    this.form = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then(socialuser => {
      const reqObject = {
        email: socialuser.email,
        userName: socialuser.firstName + socialuser.lastName,
        password: socialuser.authToken,
        image: socialuser.photoUrl,
        socialAuth: 'SocialAuth' + socialuser.authToken,
        type: 'student'
      };
      if (reqObject.email && reqObject.password && reqObject.type && reqObject.userName) {
        this.authServiceLocal.register(reqObject)
          .subscribe(
            () => {
              console.log("User is registered.");
            }
          );
      }
      this.authServiceLocal.authenticate(reqObject)
        .subscribe(
          (resp) => {
            console.log(resp);
            sessionStorage.setItem('id_token', resp['token']);
            sessionStorage.setItem('user', JSON.stringify(resp['user']));
            if (resp['user']['role'] === 'student') {
              this.router.navigateByUrl('/home');
            } else {
              this.router.navigateByUrl('/dashboard');
            }            
          }
        );      
    });
  }

  signInWithFB(): void {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }

  signOut(): void {
    this.authService.signOut();
  }

  login() {
    const val = this.form.value;

    if (val.email && val.password) {
      this.authServiceLocal.authenticate(val)
        .subscribe(
          (resp) => {
            console.log(resp);
            sessionStorage.setItem('id_token', resp['token']);
            sessionStorage.setItem('user', JSON.stringify(resp['user']));
            if (resp['user']['role'] === 'student') {
              this.router.navigateByUrl('/home');
            } else {
              this.router.navigateByUrl('/dashboard');
            }
          }
        );
    }
  }

  ngOnInit() {
    if (this.authServiceLocal.loggedIn()) {
      const user = JSON.parse(sessionStorage.getItem('user'));
      if (user.role === 'student') {
        this.router.navigateByUrl('/home');
      } else {
        this.router.navigateByUrl('/dashboard');
      }
    }
  }

}
