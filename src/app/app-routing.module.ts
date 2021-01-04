import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { NewQuizComponent } from './new-quiz/new-quiz.component';
import { QuizComponent } from './quiz/quiz.component';
import { AuthGuard } from './auth.guard';
import { StudentGuard } from './student.guard';
import { TeacherGuard } from './teacher.guard';
import { ResponseComponent } from './response/response.component';
import { ContactComponent } from './contact/contact.component'

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard, StudentGuard] },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard, TeacherGuard] },
  { path: 'newquiz', component: NewQuizComponent, canActivate: [AuthGuard, TeacherGuard] },
  { path: 'quiz/:id', component: QuizComponent, canActivate: [AuthGuard, StudentGuard] },
  { path: 'response/:id', component: ResponseComponent, canActivate: [AuthGuard, TeacherGuard] },
  { path: 'contact', component: ContactComponent}

  // { path: '**', redirectTo: 'home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
