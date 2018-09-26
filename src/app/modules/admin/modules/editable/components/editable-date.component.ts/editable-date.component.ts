import { Component, Input, Output, EventEmitter } from '@angular/core';

import { Edited } from '../../../../../../models/edited';

@Component({
    selector:'editable-date',
    templateUrl:'./editable-date.component.html',
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
        let edited:Edited = {
			type:this.type,
			value:this.value
		};
        if(!isNaN(this.id)){
            edited.id=this.id
        }
        this.stopedit.emit(edited)
    }
}
