import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth-service';

@Component({
  selector: 'app-account-page',
  imports: [],
  templateUrl: './account-page.html',
  styleUrl: './account-page.scss',
})
export class AccountPage {
  authService = inject(AuthService)
}
