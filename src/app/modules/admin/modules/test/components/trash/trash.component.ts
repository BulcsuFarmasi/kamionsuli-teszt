import { Component, OnInit, OnDestroy } from '@angular/core';


import { Test } from '../../../../../../models/test';

import { TestService } from '../../../../../../services/test.service';
import { Observable, Subscription } from 'rxjs';

@Component({
    selector: 'trash',
    templateUrl: './trash.component.html',
    styleUrls:['./trash.component.scss']
})
export class TrashComponent implements OnInit, OnDestroy{

    public tests:Test[];
    public testsSubscription:Subscription;
    public deleteSubscription:Subscription;
    public untrashSubscription:Subscription;
    constructor (private testService:TestService) {}

    ngOnInit(){
        this.testsSubscription = this.testService.getTests(true, 0).subscribe((tests:Test[]) => {
            this.tests = tests;
        });
    }

    ngOnDestroy () {
        this.testsSubscription.unsubscribe();
        if (this.deleteSubscription) {
            this.deleteSubscription.unsubscribe();
        }
        if (this.untrashSubscription) {
            this.untrashSubscription.unsubscribe();
        }
    }

    deleteTest (test:Test) {
        if (confirm('Biztosan törölni akarod a tesztet?')) {
            this.deleteSubscription = this.testService.deleteTest(test.id).subscribe(response => {
                this.removeTest(test);
            })
        }
    }

    removeTest (test:Test) {
        let index = this.tests.indexOf(test)
        this.tests.splice(index, 1);
    }

    untrashTest (test:Test) {
        this.untrashSubscription = this.testService.untrashTest(test.id).subscribe(() => {
            this.removeTest(test);
        })
    }


}
