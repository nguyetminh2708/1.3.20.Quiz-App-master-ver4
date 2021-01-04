import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceLocal {

  private headers = new HttpHeaders().set('Content-Type', 'application/json');
  private url = environment.URL

  constructor(private http: HttpClient, public jwtHelper: JwtHelperService) { }

  register(newUser) {
    return this.http.post(this.url + '/api/register', newUser, { headers: this.headers });
  }


  authenticate(user) {
    return this.http.post(this.url + '/api/authenticate', user, { headers: this.headers });
  }
  createQuiz(quiz) {
    return this.http.post(this.url + '/api/createQuiz', quiz, { headers: this.headers });
  }

  getQuiz() {
    return this.http.get(this.url + '/api/getQuiz', { headers: this.headers });
  }

  deleteQuiz(id) {
    return this.http.post(this.url + '/api/deleteQuiz', { id }, { headers: this.headers });
  }

  getQuizById(id) {
    return this.http.post(this.url + '/api/getQuizById', { id }, { headers: this.headers });
  }

  saveResponse(id, response) {
    return this.http.post(this.url + '/api/saveResponse', { id, response }, { headers: this.headers });
  }

  loggedIn() {
    const token: string = sessionStorage.getItem('id_token');
    // const loggedIn = JSON.parse(sessionStorage.getItem('loggedIn'));
    return token != null && !this.jwtHelper.isTokenExpired(token);
  }
}
