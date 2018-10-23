import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';


import { components } from './declarations'

import { AnswerService } from '../../../../services/answer.service';
import { JwtService } from '../../../../services/jwt.service'
import { TestService } from '../../../../services/test.service';
import { FillService } from '../../../../services/fill.service';
import { NetworkService } from '../../../../services/network.service';
import { TimerComponent } from './components/timer/timer.component';

@NgModule({
    imports:[ FormsModule, HttpClientModule, CommonModule, RouterModule ],
    declarations:[...components, TimerComponent],
    providers:[AnswerService,FillService, JwtService, NetworkService, TestService],
    exports:[...components]
})

export class TestModule{};