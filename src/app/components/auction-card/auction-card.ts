import { Component, Input } from '@angular/core';
import { AuctionDisplay } from '../../services/auction-service';

@Component({
  selector: 'app-auction-card',
  imports: [],
  templateUrl: './auction-card.html',
  styleUrl: './auction-card.scss',
})
export class AuctionCard {
  @Input() auction!: AuctionDisplay;
}
