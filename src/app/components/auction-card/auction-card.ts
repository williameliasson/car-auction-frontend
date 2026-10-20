import { Component, Input } from '@angular/core';
import { AuctionDisplay } from '../../services/auction-service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-auction-card',
  imports: [RouterLink],
  templateUrl: './auction-card.html',
  styleUrl: './auction-card.scss',
})
export class AuctionCard {
  @Input() auction!: AuctionDisplay;
}
