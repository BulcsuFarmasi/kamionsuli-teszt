import { Route } from "@angular/router";

import { SendResetPasswordComponent } from "./components/send-reset-password/send-reset-password.component";
import { userRoutes } from "./user.routing";

describe('userRoutes', () => {
    it('should have a link for send reset password', () => {
        const route:Route = { path: 'user/send-reset-password', component: SendResetPasswordComponent }

        expect(userRoutes).toContain(route);
    })
})