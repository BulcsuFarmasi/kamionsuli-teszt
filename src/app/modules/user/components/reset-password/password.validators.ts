import { AbstractControl } from "@angular/forms";

export class PasswordValidators {
    static passwordsMatch (control:AbstractControl) {
        const password = control.get('password');
        const password2 = control.get('password2');

        if (password.value !== password2.value) {
            return { passwordsMatch: true }
        }

        return null;
    }
}