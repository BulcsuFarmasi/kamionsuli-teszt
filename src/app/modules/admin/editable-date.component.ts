import { Component, Input, Output, EventEmitter } from '@angular/core';

import { Edited } from '../services/edited';

@Component({
    selector:'editable-date',
    templateUrl:'templates/editable-date.component.html'
})

export class EditableDateComponent{
    @Input() value:Date;
    @Input() type:string;
    @Input() id:number;
    @Output() stopedit:EventEmitter<Edited>=new EventEmitter();
    public editing:boolean=false;

    startEditing(){
        this.editing=true;
    }
    stopEditing(){
        this.editing=false;
        var edited=new Edited();
        edited.type=this.type;
        if(!isNaN(this.id)){
            edited.id=this.id
        }
        edited.value=this.value;
        this.stopedit.emit(edited)
    }
}
