import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { JwtService } from '../../../../services/jwt.service'
import { components } from './declarations'
import { TestService } from '../../../../services/test.service';
import { FillService } from '../../../../services/fill.service';
import { TestsComponent } from './components/tests/tests.component';

@NgModule({
    imports:[ FormsModule, HttpClientModule, CommonModule, RouterModule ],
    declarations:[...components, TestsComponent],
    providers:[JwtService, TestService, FillService],
    exports:[...components]
})

export class TestModule{};