import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TestComponent } from '../test/components/test/test.component';

const appRoutes: Routes = [
	{path: '', redirectTo: '/test/1', pathMatch:'full'},
	{path:'test/:testId',component:TestComponent}
]

@NgModule({
	imports: [
		RouterModule.forRoot(appRoutes)
	],
	exports: [
		RouterModule
	]
})

export class RoutingModule {}