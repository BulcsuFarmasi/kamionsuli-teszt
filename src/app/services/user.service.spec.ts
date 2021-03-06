import { UserService } from "./user.service";
import { NetworkService } from "./network.service";

describe('UserService', () => {
    let userService
    let networkService
    
    beforeEach(() => {
        networkService = new NetworkService(null, null)
        userService = new UserService(networkService, null);
    })

    describe('sendResetPassword', () => {
        it ('should call network service with user/send-reset-password', () => {
            const spy = spyOn(networkService, 'post');
            const email = 'a@a.hu'

            userService.sendResetPassword(email);

            expect(spy).toHaveBeenCalledWith('user/sendResetPassword', { email });
        })
        it ('should call network service with user/getByPasswordRetrieverCode', () => {
            const spy = spyOn(networkService, 'get');
            const passwordRetrieverCode = 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'

            userService.getByPasswordRetrieverCode(passwordRetrieverCode);

            expect(spy).toHaveBeenCalledWith('user/getByPasswordRetrieverCode/' + passwordRetrieverCode);
        })
    });
})