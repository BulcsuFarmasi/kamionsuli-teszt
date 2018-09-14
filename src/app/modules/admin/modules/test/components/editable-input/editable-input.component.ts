import { Component, Input, Output, EventEmitter, ViewEncapsulation } from '@angular/core';

import { Edited } from '../../../../../../models/edited';

@Component({
	selector:'editable-input',
	templateUrl:'./editable-input.component.html',
	styleUrls:['./editable-input.component.scss'],
	encapsulation: ViewEncapsulation.None,
})

export class EditableInputComponent{
	@Input() value:any;
	@Input() inputType:string;
	@Input() type:string;
	@Input() id:number;
	@Input() placeholder:string;
	@Output() onStopEditing:EventEmitter<Edited>=new EventEmitter();
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
		this.onStopEditing.emit(edited)
	}
}