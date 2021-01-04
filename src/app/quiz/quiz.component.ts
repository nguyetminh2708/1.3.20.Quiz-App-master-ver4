import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthServiceLocal } from '../service/auth.servicelocal';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {
  id: string;
  quiz: any;
  form: FormGroup;
  loaded: boolean = false;

  constructor(private route: ActivatedRoute, private authServiceLocal: AuthServiceLocal, private router: Router, private fb: FormBuilder) {
    const user = JSON.parse(sessionStorage.getItem('user'));
    this.form = this.fb.group({
      marks: 0,
      student: user.email,
      answers: this.fb.array([]),
    });
  }
  init() {
    const control = <FormArray>this.form.get('answers');
    for (let i = 0; i < this.quiz.length; i++) {
      control.push(
        this.fb.group({
          question: this.quiz[i]['_id'],
          answer: ['', Validators.required]
        })
      );
    }
    this.loaded = true;
    console.log(this.form);
  }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.getQuizById(this.id);
  }

  getQuizById(id) {
    this.authServiceLocal.getQuizById(id).subscribe((data) => {
      if (data['success'] === true) {
        console.log(data);
        this.quiz = data['msg']['questions'];
        this.init();
      }
    });
  }

  save() {
    let totalMarks = 0;
    for (let i = 0; i < this.quiz.length; i++) {
      if(this.quiz[i]['_id'] === this.form.value.answers[i]['question'] && this.quiz[i]['correctOption'] === this.form.value.answers[i]['answer'] ) {
        totalMarks = totalMarks +  this.quiz[i]['mark'];
      }
    }
    this.form.value.marks = totalMarks;
    if (this.form.valid) {
      this.authServiceLocal.saveResponse(this.id, this.form.value)
        .subscribe(
          (resp) => {
            console.log(resp);

            if (resp['success'] === true) {
              this.form.reset();
              this.router.navigateByUrl('/home');
            } else {
              console.log('error');
            }
          }
        );
    }
  }

  cancel() {
    this.router.navigateByUrl('/home');
  }

}
