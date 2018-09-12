import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { routing } from './app.routing';
import { components } from './declarations';
import { AppComponent } from './app.component';
import { AdminProviders } from '../services/admin-providers';
import { JwtService } from '../services/jwt-service'
import { TestService } from "../services/test.service";

 
@NgModule({
	imports:[BrowserModule, FormsModule, HttpModule, routing],
	declarations:[...components],
	providers:[AdminProviders,JwtService, TestService],
	bootstrap:[AppComponent]
})
export class AppModule{}