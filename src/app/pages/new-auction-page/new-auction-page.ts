import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuctionService } from '../../services/auction-service';
import { MakeService } from '../../services/make-service';
import { AuthService } from '../../services/auth-service';

@Component({
  selector: 'app-new-auction-page',
  imports: [ReactiveFormsModule],
  templateUrl: './new-auction-page.html',
  styleUrl: './new-auction-page.scss',
})
export class NewAuctionPage {
  makeService = inject(MakeService);
  auctionService = inject(AuctionService);
  authService = inject(AuthService);
  private fb = inject(FormBuilder);
  lockCreateButton = signal<boolean>(false);

  ngOnInit(): void {
    this.makeService.fetchCarMakes();
  }
  newAuctionForm = this.fb.group({
    title: ['', Validators.required],
    description: ['', Validators.required],
    plate: ['', Validators.required],
    deadline: ['', Validators.required],
    make_id: ['', Validators.required],
    modelYear: [0, Validators.required],
    odometerKm: [0, Validators.required],
  })
}
