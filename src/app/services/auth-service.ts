import { HttpClient, HttpResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { env } from '../../env/env';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  
  register(form: FormGroup){
    this.http.post<HttpResponse<void>>(
      env.apiUrl + "/register",
      form.value,
      {withCredentials: true}
    ).subscribe()
  }
  
  login(form: FormGroup){
    this.http.post<HttpResponse<void>>(
      env.apiUrl + "/login",
      form.value,
      {withCredentials: true}
    ).subscribe()
  }
}
