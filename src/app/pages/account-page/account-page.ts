import { Component, inject, signal } from '@angular/core';
import { AuthService } from '../../services/auth-service';
import { FormBuilder, Validators, ReactiveFormsModule} from '@angular/forms';
import { prettify } from '../../utils';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { OrderService } from '../../services/order-service';

@Component({
  selector: 'app-account-page',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './account-page.html',
  styleUrl: './account-page.scss',
})
export class AccountPage {
  authService = inject(AuthService);
  orderService = inject(OrderService);

  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute)
  successfulPayment = signal<boolean | null>(null);
  suggestedDepositSek = 1_000;

  prettify = prettify;

  ngOnInit(): void {
    this.authService.fetchCurrentUser();
    const successfulPaymentParam = this.route.snapshot.queryParamMap.get("successfulPayment")
    if (successfulPaymentParam != null){
      this.successfulPayment.set(successfulPaymentParam == "true")
    }
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

  // Deposit form 
  depositForm = this.fb.group({
    amountSek: [this.suggestedDepositSek, Validators.required]
  })
}
