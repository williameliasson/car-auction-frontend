import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { env } from '../../env/env';
import { Observable } from 'rxjs';

export type OrderDisplay = {
  id: number,
  username: string,
  amountSek: number,
  createdAt: string,
  isPaid: boolean
}

export type CheckoutResponse = {
  url: string
}

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private http = inject(HttpClient);

  startDeposit(form: FormGroup){

    // create an order and keep the orderId
    let orderId = null;
    this.createOrder(form).subscribe({
      next: (response) => {
        orderId = response.id
        // create the checkout session
        this.http.post<CheckoutResponse>(
          env.apiUrl + "/stripe/checkout",
          {orderId: orderId},
          {withCredentials: true}
        ).subscribe({
          next: (response) => {
            window.location.href = response.url
          }
        })
      }
    })
    
  }

  createOrder(form: FormGroup): Observable<OrderDisplay>{
    return this.http.post<OrderDisplay>(
      env.apiUrl + "/orders", 
      form.value, 
      {withCredentials: true}
    )
  }
}
