import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { env } from '../../env/env';

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
  odometerKm: number
}


@Injectable({
  providedIn: 'root',
})
export class AuctionService {
  private http = inject(HttpClient);
  auctions = signal<AuctionDisplay[]>([]);

  fetchAuctions(){
    this.http.get<AuctionDisplay[]>(env.apiUrl + "/auctions", {observe: "response"}).subscribe(
      {next: (data) => {
        if (data.status == 200 && data.body) {
          this.auctions.set(data.body);
        }
      }}
    )
  }

  fetchAuction(id: number){
    return this.http.get<AuctionDisplay>(env.apiUrl + "/auctions/" + id, {observe: "response"})
  }
}
