import { Component, OnInit } from '@angular/core';
import { AuthServiceLocal } from '../service/auth.servicelocal';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  constructor(private authServiceLocal: AuthServiceLocal, private router: Router) { }

  ngOnInit() {
  }

}
