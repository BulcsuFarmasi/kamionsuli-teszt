import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class NetworkService {

  private url = 'https://kamionsuli-teszt.farmasibulcsu.hu/api/public/';
  private headers:HttpHeaders = new HttpHeaders();
  
  constructor(private httpClient:HttpClient, private jwtService) {}

  delete (urlPart:string) {
    this.setAuthorizationHeader();
    return this.httpClient.delete(this.url + urlPart, {headers: this.headers});
  }
  
  get (urlPart:string) {
    this.setAuthorizationHeader();
    return this.httpClient.get(this.url + urlPart, {headers: this.headers});
  }

  patch (urlPart:string, body:any) {
    this.setAuthorizationHeader();
    return this.httpClient.patch(this.url + urlPart, body, { headers: this.headers });
  }

  post (urlPart:string, body:any) {
    this.setAuthorizationHeader();
    return this.httpClient.post(this.url + urlPart, body, {headers: this.headers});
  }

  setAuthorizationHeader () {
      if (this.jwtService.token) {
        this.headers = this.headers.set('Authorization','Bearer ' + this.jwtService.token);
      }
  }
}
