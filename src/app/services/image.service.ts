/**
 * Created by Dell on 2016. 12. 19..
 */
import { Injectable } from "@angular/core";

import { Image } from "./image";
import { JwtService } from './jwt-service';
import { Question } from './question.service'

@Injectable()
export class ImageService{
    constructor(private jwtService:JwtService){};
    saveImage(questionId:number,image:Image){
        return this.jwtService.post('../api/public/image/save',{questionId:questionId,image:image}).toPromise()
            .then(response =>
                response.json()
            );
    }
    deleteImage(id:number){
        this.jwtService.post('../api/public/image/delete',{id:id}).toPromise();
    }
}