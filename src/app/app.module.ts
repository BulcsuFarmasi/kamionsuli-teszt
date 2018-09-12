import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser';

import { RoutingModule } from './modules/routing/routing.module';

import { HomeModule } from './modules/home/home.module';

import { AppComponent } from './app.component';
import { NotFoundComponent } from './components/not-found/not-found.component';


@NgModule({
	imports:[ BrowserModule, HomeModule, RoutingModule ],
	declarations: [AppComponent, NotFoundComponent],
	bootstrap: [AppComponent]
})

export class AppModule{}