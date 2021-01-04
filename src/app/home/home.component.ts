import { Component, OnInit } from '@angular/core';
import { AuthServiceLocal } from '../service/auth.servicelocal';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  rows = [];
  columns = [
    { prop: 'title', name: 'Title' },
    { prop: 'subject', name: 'Subject' },
    { prop: 'time', name: 'Time' },
    { prop: 'totalMarks', name: 'Total Marks' },
    { prop: 'marks', name: 'Marks' },

  ];

  temp = [];
  table: any;

  sortOrders = [];
  quiz: any;

  constructor(private authServiceLocal: AuthServiceLocal, private router: Router) { }

  ngOnInit() {
    this.getQuiz();
  }

  getQuiz() {
    this.authServiceLocal.getQuiz().subscribe((data) => {
      console.log(data);
      if (data['success'] === true) {
        this.quiz = data['msg'];
        this.sortOrders = [];
        this.sortOrders.push({ 'show': 'All', 'value': this.rows.length });
        this.temp = [...this.quiz];
        this.rows = this.temp;
      } else {
        console.log('error');
      }
    });
  }

  marks(row) {

    const user = JSON.parse(sessionStorage.getItem('user'));
    for (let i = 0; i < row['response'].length; i++) {
      if (user['email'] === row['response'][i]['student']) {
        return row['response'][i]['marks'];
      }
    }
    return '-'
  }

  logout() {
    sessionStorage.clear();
    this.router.navigateByUrl('/login');
  }

  startQuiz(row) {
    this.router.navigate(['/quiz', row['_id']]);
  }

  getResult(row) {
    this.router.navigate(['/quiz', row['_id']]);
  }

  updateFilter(event) {
    const val = event.target.value.toLowerCase();

    // filter our data
    const temp = this.temp.filter(function (d) {
      // console.log(d);
      return d.title.toLowerCase().indexOf(val) !== -1 || d.subject.toLowerCase().indexOf(val) !== -1;
    });

    // update the rows
    this.rows = temp;
    // Whenever the filter changes, always go back to the first page
    // this.table.offset = 0;
  }

}
