import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
	selector:'editor',
	templateUrl:'./editor.component.html'
})

export class EditorComponent implements OnInit{
	@Input() text:string;
	@Output() blur:EventEmitter<string>=new EventEmitter();
	constructor(){}
	ngOnInit(){
	    var editor=CKEDITOR.inline('editor');
	    editor.on('blur',e => {
	        this.blur.emit(e.editor.getData());
        });
    }


}