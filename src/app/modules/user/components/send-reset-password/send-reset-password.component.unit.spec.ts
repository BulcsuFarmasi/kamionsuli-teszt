import { NgForm } from '@angular/forms';

import { SendResetPasswordComponent } from "./send-reset-password.component"
import { UserService } from '../../../../services/user.service';
import { empty } from 'rxjs';


describe('SendResetPassword', ()=> {
    
    let sendResetPasswordComponent:SendResetPasswordComponent;
    let userService:UserService;

    beforeEach(() => {
        userService = new UserService(null, null)
        sendResetPasswordComponent = new SendResetPasswordComponent(userService);
    })
    
    describe('isSended', () => {
        it('should be false initially', () => {
            expect(sendResetPasswordComponent.isSended).toBeFalsy();
        })

        it('should change to true when submit method is called', () => {
            spyOn(userService, 'sendResetPassword').and.callFake(() => empty())

            sendResetPasswordComponent.submit(new NgForm([],[]));

            expect(sendResetPasswordComponent.isSended).toBeTruthy();
        })
    })

    it ('should call userService sendResetPassword is isSended is false',  () => {
        const spy = spyOn(userService, 'sendResetPassword').and.callFake(() => empty());

        sendResetPasswordComponent.submit(new NgForm([],[]));

        expect(spy).toHaveBeenCalled();
    })

    it ('should NOT call userService sendResetPassword is isSended is true',  () => {
        const spy = spyOn(userService, 'sendResetPassword').and.callFake(() => empty());
        sendResetPasswordComponent.isSended = true;

        sendResetPasswordComponent.submit(new NgForm([],[]));

        expect(spy).not.toHaveBeenCalled();
    })
})