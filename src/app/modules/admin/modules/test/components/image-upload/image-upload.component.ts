import { Component, Output, EventEmitter } from  '@angular/core';

import { Image } from '../../../../../../models/image';

@Component({
    selector:'image-upload',
    templateUrl:'./image-upload.component.html'
})

export class ImageUploadComponent{
    @Output() sendfile:EventEmitter<Image>=new EventEmitter();
    private fileReader:FileReader=new FileReader();
    private image:Image;

    getFile(event){
        var file=event.srcElement.files[0];
        if(file){
            this.image.name=file.name;
            this.image.type=file.type;
            this.readFile(file)
        }
    }
    readFile(file:File){
        this.fileReader.readAsDataURL(file);
        this.sendFile()
    }

    sendFile(){
        this.fileReader.addEventListener('load',() => {
            this.image.data=this.fileReader.result
            this.sendfile.emit(this.image);
        })
    }
}