import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { env } from '../../env/env';
import { FormGroup } from '@angular/forms';
import { form } from '@angular/forms/signals';
import { Router } from '@angular/router';

// String title,
//     String description,
//     String plate,
//     Instant deadline,
//     // Integer make_id,
//     String makeName,
//     Integer modelYear,
//     Integer odometerKm

export type AuctionDisplay = {
  id: number,
  title: string,
  description: string,
  plate: string | null,
  deadline: string,
  makeName: string,
  modelYear: number,
  odometerKm: number,
  valuationMin: number,
  valuationMax: number,
  ownerPseudonym: string,
  requestingUserPseudonym: string | null,
  bids: BidDisplay[]
}

export type BidDisplay = {
  auctionId: number,
  bidId: number,
  pseudonym: string,
  amount: number,
}

@Injectable({
  providedIn: 'root',
})
export class AuctionService {
  private http = inject(HttpClient);
  private router = inject(Router);
  auctions = signal<AuctionDisplay[]>([]);

  fetchAuctions(){
    this.http.get<AuctionDisplay[]>(env.apiUrl + "/auctions", {withCredentials: true, observe: "response"}).subscribe(
      {next: (data) => {
        if (data.status == 200 && data.body) {
          this.auctions.set(data.body);
        }
      }}
    )
  }

  fetchAuction(id: number){
    return this.http.get<AuctionDisplay>(env.apiUrl + "/auctions/" + id, {withCredentials: true, observe: "response"})
  }

  createAuction(form: FormGroup, lockCreateButton: WritableSignal<boolean>){
    // lock the button directly upon starting the POST request. Unlock if returned code is not 201
    lockCreateButton.set(true);
    const dateFixedForm = {
      ...form.value,
      deadline: new Date(form.value.deadline).toISOString()
    }
    this.http.post<AuctionDisplay>(env.apiUrl + "/auctions", dateFixedForm, {withCredentials: true}).subscribe({
      next: (response) => {
        if (!response) return;
        this.router.navigate(["/auction", response.id])
      },
      error: (respone) => {
        lockCreateButton.set(false);
      }
    })
  }
}
