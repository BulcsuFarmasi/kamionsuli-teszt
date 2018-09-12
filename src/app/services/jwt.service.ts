import { Injectable } from '@angular/core';

import { JwtPayload } from '../models/jwt-payload'

import { NetworkService } from './network.service';

@Injectable()
export class JwtService{
    private tokenName:string;
    private token:string;
    constructor(private networkService:NetworkService){
        this.tokenName='id_token'
    };

    decode(){
        var parts=this.token.split(/\./);
        var payloadJson=JSON.parse(atob(parts[1]));

        var payload:JwtPayload = {
            id: payloadJson.sub,
            expire: new Date(0)
        };
        payload.expire.setUTCSeconds(payloadJson.exp);

        return payload;
    }

    get(url:string){
        this.networkService.setAuthorizationHeader(this.token);
        return this.networkService.get(url);
    };

    getToken(){
        if(!this.token){
            this.token=localStorage.getItem(this.tokenName);
        }
    }

    post(url:string,data?){
        this.networkService.setAuthorizationHeader(this.token);
        return this.networkService.post(url,data)
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
