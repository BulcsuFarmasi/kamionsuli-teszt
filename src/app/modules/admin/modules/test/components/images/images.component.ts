/**
 * Created by Dell on 2016. 12. 22..
 */
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
    selector:'images',
    templateUrl:'./images.component.html'
})

export class ImagesComponent implements OnInit{
    @Input() images:any[];
    @Output() imagedelete:EventEmitter<number> = new EventEmitter();

    ngOnInit(){
        this.images.forEach((elem) => {
            elem.path='../'+elem.path;
        })
    }

    delete(id){
        this.imagedelete.emit(id);
    }
}