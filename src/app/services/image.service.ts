/**
 * Created by Dell on 2016. 12. 19..
 */
import { Injectable } from "@angular/core";

import { Image } from "../models/image";
import { NetworkService } from "./network.service";

@Injectable()
export class ImageService{
    constructor(private networkService:NetworkService){};
    saveImage(questionId:number,image:Image){
       /* return this.jwtService.post('../api/public/image/save',{questionId:questionId,image:image}).toPromise()
            .then(response =>
                response.json()
            );
        */    
    }
    deleteImage(id:number){
        return this.networkService.delete('image/' + id );
    }
}