import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class NetworkService {

  private url = 'https://kamionsuli-teszt.farmasibulcsu.hu/api/public/';
  private headers:HttpHeaders = new HttpHeaders();
  
  constructor(private httpClient:HttpClient) {}

  get (url:string) {
    return this.httpClient.get(this.url + url, {headers: this.headers});
  }

  post (url:string, body) {
    console.log(this.headers);
    return this.httpClient.post(this.url + url, body, {headers: this.headers});
  }

  setAuthorizationHeader (token:string) {
      this.headers = this.headers.set('Authorization','Bearer ' + token);
      console.log(this.headers);
  }
}
