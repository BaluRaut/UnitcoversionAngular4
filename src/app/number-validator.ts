import { AbstractControl } from '@angular/forms';

export function validNumber(control: AbstractControl) {
    if (isNaN(control.value)) {
        return { validNumber: true };
    }  
    return null;
}