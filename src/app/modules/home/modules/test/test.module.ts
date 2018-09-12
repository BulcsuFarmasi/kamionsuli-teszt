import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { JwtService } from '../../../../services/jwt-service'
import { components } from './declarations'
import { TestService } from "../../../../services/test.service";
import { FillService } from "../../../../services/fill.service";

@NgModule({
    imports:[ FormsModule, HttpModule, CommonModule ],
    declarations:[...components],
    providers:[JwtService, TestService, FillService],
    exports:[...components]
})

export class TestModule{};