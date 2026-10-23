import { Injectable } from '@angular/core';
import { Client, Stomp } from '@stomp/stompjs';
import SockJS from "sockjs-client";
import { env } from '../../env/env';

@Injectable({
  providedIn: 'root',
})
export class WebsocketService {
  // src: https://www.youtube.com/watch?v=n1OsofcIJ_A
  stompClient: any;
  wsEndpoint = env.apiUrl + "/ws";

  connect(){
    let ws = SockJS(this.wsEndpoint);
    this.stompClient = Stomp.over(ws);
    const _this = this;
    _this.stompClient.connect({}, function (frame: any){})
  }

  subscribe(topic: string, onMessageReceived: (message: any) => void){
    if (!this.stompClient){
      this.connect()
    }
    if (this.stompClient.connected){
      this.stompClient.subscribe(topic, onMessageReceived);
    } else {
      this.stompClient.connect({}, () => {
        this.stompClient.subscribe(topic, onMessageReceived)
      })

    }
      
  }

  disconnect(){
    if (this.stompClient !== null) {
      this.stompClient.disconnect()
    }
  }

}
