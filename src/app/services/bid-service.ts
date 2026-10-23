import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { env } from '../../env/env';



@Injectable({
  providedIn: 'root',
})
export class BidService {
  private http = inject(HttpClient);
  
  createBid(form: FormGroup, auctionId: number){
    this.http.post(env.apiUrl + "/auctions/" + auctionId + "/bids", form.value, {withCredentials: true, observe: "response"}).subscribe(
      {next: (data) => {
        if (data.status == 201){
         // popup saying bid successfull maybe? 
        }
      }}
    );
  }
}
