import { Component, computed, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuctionDisplay, AuctionService, BidDisplay } from '../../services/auction-service';
import { prettify } from '../../utils';
import { AuthService } from '../../services/auth-service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { BidService } from '../../services/bid-service';
import { WebsocketService } from '../../services/websocket-service';

@Component({
  selector: 'app-auction-page',
  imports: [ReactiveFormsModule],
  templateUrl: './auction-page.html',
  styleUrl: './auction-page.scss',
})
export class AuctionPage {
  // src: https://angular.dev/guide/routing/read-route-state
  auctionId = signal<number | null>(null);
  auction = signal<AuctionDisplay | null>(null);
  bids = signal<BidDisplay[]>([]);
  
  authService = inject(AuthService);
  bidService = inject(BidService)
  private fb = inject(FormBuilder);
  websocketService = inject(WebsocketService)

  prettify = prettify;

  suggestedBidIncrementAmount = 1000;
  
  highestBidAmount = computed(() => {
    if (!this.bids()) return 0;
    if (this.bids()!.length == 0) return 0;
    
    // src: https://javascript.plainenglish.io/how-to-find-the-max-value-of-a-property-in-an-array-of-javascript-objects-b2e0c7dbb2ff
    const highestBid = Math.max(... this.bids()!.map(bid => bid.amount))
    return highestBid;
  })

  newBidForm = this.fb.group({
    amount: [
      this.highestBidAmount() + this.suggestedBidIncrementAmount, // Initial bid is the highest one, plus suggested increment
      [Validators.required, Validators.min(this.highestBidAmount()+1)] // The bid amount must be greater than the current highest bid
    ]
  })

  private route = inject(ActivatedRoute);
  auctionService = inject(AuctionService);

  ngOnInit(): void{
    const auctionId: string | null = this.route.snapshot.paramMap.get("id");
    if (auctionId == null) return; // todo: handle error
    this.auctionId.set(parseInt(auctionId));

    this.auctionService.fetchAuction(parseInt(auctionId)).subscribe(
      {next: (data) => {
        this.auction.set(data.body);
        this.bids.set(data.body!.bids);
      }}
    );
    this.websocketService.subscribe("/topic/auction/" + auctionId + "/newBid", (message: any) => this.onNewBidReceived(message))    
  }

  onNewBidReceived(message: any){
    console.log("msg")
    const bid: BidDisplay = JSON.parse(message.body)
    console.log(bid)
    this.bids.update((bids) => [...bids, bid])
  }
}
