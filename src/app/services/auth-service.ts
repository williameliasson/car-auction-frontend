import { HttpClient, HttpResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { env } from '../../env/env';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  
  register(){
    this.http.post<HttpResponse<void>>(env.apiUrl + "/register", {"username" : "user2", "email": "tes@test.se", "password": "password"}, {withCredentials: true}).subscribe()
  }
  
  login(){
    this.http.post<HttpResponse<void>>(env.apiUrl + "/login", {"username" : "user2", "password": "password"}, {withCredentials: true}).subscribe()
  }
}
