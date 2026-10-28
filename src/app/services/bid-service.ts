import { HttpClient } from '@angular/common/http';
import { inject, Injectable, Signal, WritableSignal } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { env } from '../../env/env';
import { BidErrorCode } from '../pages/auction-page/auction-page';



@Injectable({
  providedIn: 'root',
})
export class BidService {
  private http = inject(HttpClient);
  
  createBid(form: FormGroup, auctionId: number, errorCode: WritableSignal<BidErrorCode | null>){
    this.http.post(env.apiUrl + "/auctions/" + auctionId + "/bids", form.value, {withCredentials: true, observe: "response"}).subscribe(
      {next: (data) => {
        if (data.status == 201){
         errorCode.set(null); // clear the error message if this next request is OK
        }
      }, error: (response) => {
        if (response.status == 400){
          errorCode.set(response.error)
        }
      }}
    );
  }
}
