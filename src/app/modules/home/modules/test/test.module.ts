import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';


import { components } from './declarations'

import { JwtService } from '../../../../services/jwt.service'
import { TestService } from '../../../../services/test.service';
import { FillService } from '../../../../services/fill.service';
import { NetworkService } from '../../../../services/network.service';

@NgModule({
    imports:[ FormsModule, HttpClientModule, CommonModule, RouterModule ],
    declarations:[...components],
    providers:[FillService, JwtService, NetworkService, TestService],
    exports:[...components]
})

export class TestModule{};