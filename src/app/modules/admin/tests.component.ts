import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { TestService, Test } from '../services/test.service';

@Component({
	templateUrl:'templates/tests.component.html'
})

export class TestsComponent implements OnInit{
	public tests:Test[];
	constructor(private testService:TestService, private router:Router){}

	ngOnInit(){
		this.testService.getTests(false).then(tests => this.tests = tests);
	}

	addTest () {
		this.testService.addTest().then(id => {
			this.router.navigate(['edit', id]);
		});
	}

	copyTest (id:number) {
		this.testService.copyTest(id).then(test => {
			this.tests.push(test);
		})
	}

	trashTest (id:number) {
		if (confirm('Biztosan kukába akarod helyezni a tesztet?')) {
			this.testService.trashTest(id).then(response => {
				let testIndex = this.testService.getIndexById(id, this.tests);
				this.tests.splice(testIndex, 1);
			})
		}
	}
}