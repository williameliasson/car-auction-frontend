import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuctionService } from '../../services/auction-service';
import { MakeService } from '../../services/make-service';

@Component({
  selector: 'app-new-auction-page',
  imports: [ReactiveFormsModule],
  templateUrl: './new-auction-page.html',
  styleUrl: './new-auction-page.scss',
})
export class NewAuctionPage {
  makeService = inject(MakeService);
  auctionService = inject(AuctionService);
  private fb = inject(FormBuilder);

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
