import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute, Params} from '@angular/router';
import { FillService, Fill } from '../services/fill.service';

@Component({
	templateUrl:'./fill.component.html',
	styleUrls:['./fill.component.scss'],
	encapsulation: ViewEncapsulation.None
})

export class FillComponent implements OnInit{
	public fill:Fill;
	constructor(private fillService:FillService, private router:Router, private route:ActivatedRoute){}

	ngOnInit(){
		this.fill = new Fill();
		var fillId;
		this.route.params.forEach((params:Params) => {
			fillId=parseInt(params['fillId']);
		})
		this.fillService.getFill(fillId).then(fill => {
			console.log(fill);
			this.fill = fill;
			console.log(this.fill);
		})
	}
}