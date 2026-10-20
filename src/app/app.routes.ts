import { Routes } from '@angular/router';
import { HomePage } from './pages/home-page/home-page';
import { AccountPage } from './pages/account-page/account-page';
import { AuctionPage } from './pages/auction-page/auction-page';
import { NewAuctionPage } from './pages/new-auction-page/new-auction-page';

export const routes: Routes = [
    {"path": "", "component": HomePage},
    {"path": "account", "component": AccountPage},
    {"path": "auction/:id", "component": AuctionPage},
    {"path": "new-auction", "component": NewAuctionPage},
];
