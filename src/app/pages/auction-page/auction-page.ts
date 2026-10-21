import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuctionDisplay, AuctionService } from '../../services/auction-service';
import { prettify } from '../../utils';

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
  prettify = prettify;

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
