import { Component, inject, signal } from '@angular/core';
import { AuthService } from '../../services/auth-service';
import { FormBuilder, Validators, ReactiveFormsModule} from '@angular/forms';
import { prettify } from '../../utils';

@Component({
  selector: 'app-account-page',
  imports: [ReactiveFormsModule],
  templateUrl: './account-page.html',
  styleUrl: './account-page.scss',
})
export class AccountPage {
  authService = inject(AuthService)
  private fb = inject(FormBuilder);

  prettify = prettify;

  ngOnInit(): void {
    this.authService.fetchCurrentUser();
  }
  // register form
  registerForm = this.fb.group({
    username:       ['',  Validators.required],
    email:          ['', [Validators.required, Validators.email]],
    password:       ['', [Validators.required, Validators.minLength(8)]],
    repeatPassword: ['', [Validators.required, Validators.minLength(8)]]
  }, {validators: (group) => {
    return group.value.password == group.value.repeatPassword ? null : {passwordsDontMatch: true}
  }})
  
  // login form
  loginForm = this.fb.group({
    username:       ['',  Validators.required],
    password:       ['', [Validators.required, Validators.minLength(8)]],
  })
}
