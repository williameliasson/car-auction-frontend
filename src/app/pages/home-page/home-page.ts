import { Component, inject } from '@angular/core';
import { AuctionService } from '../../services/auction-service';
import { AuctionCard } from '../../components/auction-card/auction-card';

@Component({
  selector: 'app-home-page',
  imports: [AuctionCard],
  templateUrl: './home-page.html',
  styleUrl: './home-page.scss',
})
export class HomePage {
  auctionService = inject(AuctionService);

  ngOnInit(): void {
    this.auctionService.fetchAuctions();
  }
}
