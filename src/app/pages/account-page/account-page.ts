import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth-service';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-account-page',
  imports: [],
  templateUrl: './account-page.html',
  styleUrl: './account-page.scss',
})
export class AccountPage {
  authService = inject(AuthService)
  private fb = inject(FormBuilder);
  
  // register form
  registerForm = this.fb.group({
    username:       ['',  Validators.required],
    password:       ['', [Validators.required, Validators.minLength(8)]],
    repeatPassword: ['', [Validators.required, Validators.minLength(8)]]
  }, {validators: (group) => {
    return group.value.password == group.value.repeatPassword ? null : {passwordsDontMatch: true}
  }})
  
  // login form
}
