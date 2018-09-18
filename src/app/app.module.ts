import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

import { AdminModule } from './modules/admin/admin.module';
import { HomeModule } from './modules/home/home.module';
import { RoutingModule } from './modules/routing/routing.module';


@NgModule({
	imports:[ BrowserModule, HomeModule, AdminModule, RoutingModule ],
	declarations: [AppComponent, NotFoundComponent],
	bootstrap: [AppComponent]
})

export class AppModule{}