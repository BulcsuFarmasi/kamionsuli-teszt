import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';


import { Test } from '../../../../../../models/test';

import { TestService } from '../../../../../../services/test.service';
import { Subscription } from 'rxjs';

@Component({
	templateUrl:'./tests.component.html',
	styleUrls: ['./tests.component.scss']
})

export class TestsComponent implements OnInit, OnDestroy{
	tests:Test[];

	private testsSubscription:Subscription;
	private addSubscription:Subscription;
	private copySubscription:Subscription;
	private trashSubscription:Subscription;


	constructor(private testService:TestService, private router:Router){}

	ngOnInit(){
		this.testsSubscription = this.testService.getTests(false).subscribe(tests => this.tests = tests);
	}

	ngOnDestroy () {
		this.testsSubscription.unsubscribe();
		if (this.addSubscription) {
			this.addSubscription.unsubscribe();
		}
		if (this.copySubscription) {
			this.copySubscription.unsubscribe();
		}
		if (this.trashSubscription) {
			this.trashSubscription.unsubscribe();
		}
	}

	addTest () {
		this.addSubscription = this.testService.addTest().subscribe((test:Test)=> {
			this.router.navigate(['edit', test.id]);
		});
	}

	copyTest (id:number) {
		this.copySubscription = this.testService.copyTest(id).subscribe((test:Test) => {
			this.tests.push(test);
		})
	}

	trashTest (id:number) {
		if (confirm('Biztosan kukába akarod helyezni a tesztet?')) {
			this.trashSubscription = this.testService.trashTest(id).subscribe(() => {
				let testIndex = this.testService.getIndexById(id, this.tests);
				this.tests.splice(testIndex, 1);
			})
		}
	}
}