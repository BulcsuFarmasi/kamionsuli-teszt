import { TestsComponent } from './components/tests/tests.component';
import { TestComponent } from './components/test/test.component';

export const testRoutes = [
    { path: 'tests', component: TestsComponent },
    { path: 'test/:id', component: TestComponent }
]