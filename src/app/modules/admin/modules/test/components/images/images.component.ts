/**
 * Created by Dell on 2016. 12. 22..
 */
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';


import { ImageService } from '../../../../../../services/image.service';

@Component({
    selector:'images',
    templateUrl:'./images.component.html'
})

export class ImagesComponent implements OnInit{
    @Input() images:any[];
    @Output() imagedelete:EventEmitter<number> = new EventEmitter();

    constructor(private imageService:ImageService){}
    
    ngOnInit(){
        this.images.forEach((elem) => {
            elem.path='../'+elem.path;
        })
    }

    deleteImage(image){
        if(confirm('Biztos törölni akarod a képet?')) {
			this.imageService.deleteImage(image.id).subscribe(image => {
                let index = this.images.indexOf(image);
                this.images.splice(index, 1);
            });
		}
    }
}