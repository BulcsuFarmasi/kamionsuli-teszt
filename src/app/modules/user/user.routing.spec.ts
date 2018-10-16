import { Route } from "@angular/router";

import { SendResetPasswordComponent } from "./components/send-reset-password/send-reset-password.component";
import { ResetPasswordComponent } from "./components/reset-password/reset-password.component";
import { userRoutes } from "./user.routing";

describe('userRoutes', () => {
    it('should have a link for send reset password', () => {
        const route:Route = { path: 'user/send-reset-password', component: SendResetPasswordComponent }

        expect(userRoutes).toContain(route);
    })

    it('should have a link for send reset password', () => {
        const route:Route = { path: 'user/reset-password/:passwordRetreiverCode', component: ResetPasswordComponent }

        expect(userRoutes).toContain(route);
    })
})