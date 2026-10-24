import { Component, Input } from '@angular/core';
import { AuctionDisplay } from '../../services/auction-service';
import { RouterLink } from '@angular/router';
import { prettify } from '../../utils';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-auction-card',
  imports: [RouterLink, CommonModule],
  templateUrl: './auction-card.html',
  styleUrl: './auction-card.scss',
})
export class AuctionCard {
  @Input() auction!: AuctionDisplay;
  prettify = prettify
  Math = Math;
}
