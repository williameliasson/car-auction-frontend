import { Component, computed, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuctionDisplay, AuctionService } from '../../services/auction-service';
import { prettify } from '../../utils';
import { AuthService } from '../../services/auth-service';

@Component({
  selector: 'app-auction-page',
  imports: [],
  templateUrl: './auction-page.html',
  styleUrl: './auction-page.scss',
})
export class AuctionPage {
  // src: https://angular.dev/guide/routing/read-route-state
  auctionId = signal<number | null>(null);
  auction = signal<AuctionDisplay | null>(null);
  authService = inject(AuthService);
  prettify = prettify;

  highestBidAmount = computed(() => {
    if (!this.auction()) return 0;
    if (this.auction()!.bids.length == 0) return 0;
    
    // src: https://javascript.plainenglish.io/how-to-find-the-max-value-of-a-property-in-an-array-of-javascript-objects-b2e0c7dbb2ff
    const highestBid = Math.max(... this.auction()!.bids.map(bid => bid.amount))
    return highestBid;
  })

  private route = inject(ActivatedRoute);
  auctionService = inject(AuctionService);

  ngOnInit(): void{
    const id: string | null = this.route.snapshot.paramMap.get("id");
    if (id == null) return; // todo: handle error
    this.auctionId.set(parseInt(id));

    this.auctionService.fetchAuction(parseInt(id)).subscribe(
      {next: (data) => {
        this.auction.set(data.body);
      }}
    );    
  }
}
