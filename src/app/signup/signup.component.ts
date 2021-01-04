import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServiceLocal } from '../service/auth.servicelocal';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  form: FormGroup;


  constructor(private fb: FormBuilder,
    private authServiceLocal: AuthServiceLocal,
    private router: Router) {
    this.form = this.fb.group({
      userName: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      type: ['', Validators.required],
    });
  }

  login() {
    const val = this.form.value;

    if (val.userName && val.email && val.password && val.type) {
      this.authServiceLocal.register(val)
        .subscribe(
          () => {
            console.log("User is registered.");
            if (val.type === 'student') {
              this.router.navigateByUrl('/home');
            } else {
              this.router.navigateByUrl('/dashboard');
            }
          }
        );
    }
  }

  ngOnInit() {
  }

}
