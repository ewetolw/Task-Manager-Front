import {Validator, NG_VALIDATORS, AbstractControl} from '@angular/forms';
import { Directive, Input } from '@angular/core';

@Directive({
selector: '[appConfirmValidator]',
providers: [{
    provide: NG_VALIDATORS,
    useExisting: ConfirmValidatorDirective,
    multi: true
}]
})
export class ConfirmValidatorDirective implements Validator {

  @Input() appConfirmValidator: string;
  validate(control: AbstractControl): {[key: string]: any} | null {
    const controlToCompare = control.parent.get(this.appConfirmValidator);
    const compared: string = controlToCompare.value;
    if (controlToCompare && compared && compared.length < 8 ) {
      return{ 'tooShort': true };
    }
    if (controlToCompare && controlToCompare.value !== control.value) {
      return{ 'notEqual': true };
    }
    return null;
  }
}
