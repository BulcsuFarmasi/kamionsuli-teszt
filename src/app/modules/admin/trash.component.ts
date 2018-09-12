import { Component, OnInit } from '@angular/core';

import { TestService, Test } from '../services/test.service';

@Component({
    selector: 'trash',
    templateUrl: './templates/trash.component.html'
})
export class TrashComponent implements OnInit{

    public tests:Test[];
    constructor (private _testService:TestService) {}

    ngOnInit(){
        this._testService.getTests(true).then(tests => this.tests = tests);
    }

    deleteTest (id) {
        if (confirm('Biztosan törölni akarod a tesztet?')) {
            this._testService.deleteTest(id).then(response => {
                this.removeTest(id);
            })
        }
    }

    removeTest (id) {
        let testIndex = this.tests.findIndex(test => {
            if (test.id == id) {
                return true;
            }
        })
        this.tests.splice(testIndex, 1);
    }

    untrashTest (id) {
        this._testService.untrashTest(id).then(response => {
            this.removeTest(id);
        })
    }
}
