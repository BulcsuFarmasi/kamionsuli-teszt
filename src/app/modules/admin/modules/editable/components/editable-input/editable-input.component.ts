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
		let edited:Edited = {
			type:this.type,
			value:this.value
		};
		if(!isNaN(this.id)){
			edited.id=this.id
		}
		this.onStopEditing.emit(edited)
	}
}