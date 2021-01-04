import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthServiceLocal } from '../service/auth.servicelocal';

@Component({
  selector: 'app-response',
  templateUrl: './response.component.html',
  styleUrls: ['./response.component.css']
})
export class ResponseComponent implements OnInit {

  rows = [];
  columns = [
    { prop: 'number', name: 'Number' },
    { prop: 'student', name: 'Student' },
    { prop: 'marks', name: 'Marks Obtained' },
    { prop: 'totalMarks', name: 'Total Marks' },

  ];

  temp = [];
  table: any;

  sortOrders = [];
  quiz: any;
  id: string;

  constructor(private route: ActivatedRoute, private authServiceLocal: AuthServiceLocal, private router: Router) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.getQuiz(this.id);
  }

  getQuiz(id) {
    this.authServiceLocal.getQuizById(id).subscribe((data) => {
      console.log(data);
      if (data['success'] === true) {
        this.quiz = data['msg']['response'];
        this.sortOrders = [];
        this.sortOrders.push({ 'show': 'All', 'value': this.rows.length });
        this.temp = [...this.quiz];
        this.rows = this.temp;
      } else {
        console.log('error');
      }
    });
  }

  logout() {
    sessionStorage.clear();
    this.router.navigateByUrl('/login');
  }
  updateFilter(event) {
    const val = event.target.value.toLowerCase();

    // filter our data
    const temp = this.temp.filter(function (d) {
      // console.log(d);
      return d.student.toLowerCase().indexOf(val) !== -1 ;
    });

    // update the rows
    this.rows = temp;
    // Whenever the filter changes, always go back to the first page
    // this.table.offset = 0;
  }

}
