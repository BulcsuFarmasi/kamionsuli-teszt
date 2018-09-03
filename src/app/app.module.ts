import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser';

import { RoutingModule } from './modules/routing/routing.module';

import { TestModule } from './modules/test/test.module';

import { AppComponent } from './app.component';


@NgModule({
	imports:[ BrowserModule, TestModule, RoutingModule],
	declarations: [AppComponent],
	bootstrap: [AppComponent]
})

export class AppModule{}