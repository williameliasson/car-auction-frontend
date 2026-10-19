import { HttpClient, HttpResponse } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { env } from '../../env/env';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

export type UserDTO = {
  username: string,
  email: string,
  // maybe current balance as number
}
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router)
  currentUser = signal<UserDTO | null>(null);;
  
  register(form: FormGroup){
    this.http.post<HttpResponse<void>>(
      env.apiUrl + "/register",
      form.value,
      {observe: "response", withCredentials: true}
    ).subscribe(
      {next: (data) => {
        if (data.status == 200 || data.status == 201){ // on OK login
          this.fetchCurrentUser();
          this.router.navigate(["/"])
        }
      }, error: () =>{
        console.error("Failed to authenticate")
      }}
    )
  }
  
  login(form: FormGroup){
    this.http.post<HttpResponse<void>>(
      env.apiUrl + "/login",
      form.value,
      {observe: "response", withCredentials: true}
    ).subscribe(
      {next: (data) => {
        if (data.status == 200){ // on OK login
          this.fetchCurrentUser()
          this.router.navigate(["/"])
        }
      }, error: () =>{
        console.error("Failed to authenticate")
      }}
    )
  }

  fetchCurrentUser(){
    this.http.get<UserDTO>(
      env.apiUrl + "/me",
      {observe: "response", withCredentials: true}
    ).subscribe(
      {next: (data) => {
        if (data.status== 200){
          this.currentUser.set(data.body);
        }
      }}
    )
  }
}
