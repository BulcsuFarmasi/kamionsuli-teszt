import { Routes } from '@angular/router';

import { TestsComponent } from './components/tests/tests.component';
import { TestComponent } from './components/test/test.component';
import { UserGuard } from '../../../../services/user-guard';

export const testRoutes:Routes = [
    { path: 'tests', component: TestsComponent, canActivate: [UserGuard], data: {roleId: 2} },
    { path: 'test/:id', component: TestComponent, canActivate: [UserGuard], data: {roleId: 2} }
]