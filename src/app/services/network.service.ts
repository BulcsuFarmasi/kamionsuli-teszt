import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class NetworkService {

  private url = 'https://kamionsuli-teszt.farmasibulcsu.hu/api/public/'
  
  constructor(private httpClient:HttpClient) {}

  get (url:string) {
    return this.httpClient.get(this.url + url);
  }

  post (url:string, body) {
    return this.httpClient.post(this.url + url, body);
  }
}
