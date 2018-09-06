import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';

import { JwtPayload } from '../models/jwt-payload'

@Injectable()
export class JwtService{
    private tokenName:string;
    private token:string;
    constructor(private http:Http){
        this.tokenName='id_token'
    };

    decode(){
        var parts=this.token.split(/\./);
        var payloadJson=JSON.parse(atob(parts[1]));

        var payload:JwtPayload = {
            name:payloadJson.name,
            expire: new Date(0)
        };
        payload.expire.setUTCSeconds(payloadJson.exp);

        return payload
    }

    get(url:string){
        return this.http.get(url,{
            headers:this.getHeader()
        });
    };

    getHeader():Headers{
        var headers=new Headers();
        headers.set('Authorization',`Bearer ${this.token}`);
        return headers
    }

    getToken(){
        if(!this.token){
            this.token=localStorage.getItem(this.tokenName);
        }
    }

    post(url:string,data?){
        return this.http.post(url,data,{
            headers:this.getHeader()
        });
    };

    isExpired():boolean{
        this.getToken();
        if(this.token === null){
            return true;
        }
        var payload=this.decode();
        return new Date().getDate() > payload.expire.getDate();
    };

    remove(){
        localStorage.removeItem(this.tokenName);
        delete this.token;
    }

    setToken(token){
        this.token=token;
        localStorage.setItem(this.tokenName,this.token);
    }

}
