import { Injectable } from '@angular/core';

import { JwtPayload } from '../models/jwt-payload'

@Injectable()
export class JwtService{
    private tokenName:string;
    private _token:string;
    constructor(){
        this.tokenName='id_token'
    };

    decode(){
        var parts=this._token.split(/\./);
        var payloadJson=JSON.parse(atob(parts[1]));

        var payload:JwtPayload = {
            id: payloadJson.sub,
            expire: new Date(0),
            roleId: payloadJson.roleId
        };
        payload.expire.setUTCSeconds(payloadJson.exp);

        return payload;
    }

    getToken(){
        if(!this._token){
            this._token=localStorage.getItem(this.tokenName);
        }
    }

    isValid(/*roleId:number*/):boolean{
        this.getToken();
        if(this._token === null){
            return false;
        }
        var payload=this.decode();
        return this.isNotExpired(payload.expire) //&& this.isAccessible(payload.roleId, roleId);
    };

    isNotExpired(expire:Date) {
        return new Date().getDate() < expire.getDate()
    }

    isAccessible(payloadRoleId:number, roleId:number) {
        return payloadRoleId === roleId;
    }

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
