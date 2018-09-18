import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';


import { Subscription } from 'rxjs';


import { FillService } from '../../../../../../services/fill.service';
import { Fill } from '../../../../../../models/fill';

@Component({
	templateUrl:'./fill.component.html',
	styleUrls:['./fill.component.scss'],
	encapsulation: ViewEncapsulation.None
})

export class FillComponent implements OnInit{
	fill:Fill;
	private getFillSubscription:Subscription 
	constructor(private fillService:FillService, private router:Router, private route:ActivatedRoute){}

	ngOnInit(){
		let fillId = +this.route.snapshot.paramMap.get('fillId');
		this.getFillSubscription = this.fillService.getFill(fillId).subscribe(fill => {
			this.fill = fill;
		})
	}

	ngOnDestroy () {
		this.getFillSubscription.unsubscribe();
	}
}