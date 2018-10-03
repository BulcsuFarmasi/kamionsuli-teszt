import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


import { JwtService } from './jwt.service';

@Injectable()
export class NetworkService {

  private url = 'http://localhost/work-projects/kamionsuli/2018/kamionsuli-teszt-api/public/';
  private headers:HttpHeaders = new HttpHeaders();
  
  constructor(private httpClient:HttpClient, private jwtService:JwtService) {}

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

  put (urlPart:string, body:any) {
    this.setAuthorizationHeader();
    return this.httpClient.put(this.url + urlPart, body, { headers: this.headers });
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
