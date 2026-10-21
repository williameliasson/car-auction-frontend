import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { env } from '../../env/env';

export type CarMake = {
  id: number,
  name: string
}

@Injectable({
  providedIn: 'root',
})
export class MakeService {
  private http = inject(HttpClient);
  carMakes = signal<CarMake[]>([]);

  fetchCarMakes(){
    this.http.get<CarMake[]>(env.apiUrl + "/carmakes", {observe: "response"}).subscribe(
      {next: (data) => {
        if (data.status == 200 && data.body) {
          this.carMakes.set(data.body);
        }
      }}
    )
  }
}
