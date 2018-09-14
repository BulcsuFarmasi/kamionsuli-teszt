import { Injectable } from '@angular/core';

import { JwtPayload } from '../models/jwt-payload'

import { NetworkService } from './network.service';

@Injectable()
export class JwtService{
    private tokenName:string;
    private _token:string;
    constructor(private networkService:NetworkService){
        this.tokenName='id_token'
    };

    decode(){
        var parts=this._token.split(/\./);
        var payloadJson=JSON.parse(atob(parts[1]));

        var payload:JwtPayload = {
            id: payloadJson.sub,
            expire: new Date(0)
        };
        payload.expire.setUTCSeconds(payloadJson.exp);

        return payload;
    }

    getToken(){
        if(!this._token){
            this._token=localStorage.getItem(this.tokenName);
        }
    }

    isExpired():boolean{
        this.getToken();
        if(this._token === null){
            return true;
        }
        var payload=this.decode();
        return new Date().getDate() > payload.expire.getDate();
    };

    remove(){
        localStorage.removeItem(this.tokenName);
        delete this._token;
    }

    get token () {
        return this._token
    }

    setToken(token){
        this._token=token;
        localStorage.setItem(this.tokenName,this._token);
    }

}
