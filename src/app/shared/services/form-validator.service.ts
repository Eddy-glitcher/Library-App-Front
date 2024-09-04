import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FormValidatorService {

  public validEmail : string = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";

  public formEqualPasswordsValidator(pass1 : string , pass2 : string) : ValidationErrors | null{

    return( formGroup : AbstractControl ) => {
      const password1 = formGroup.get(pass1)?.value;
      const password2 = formGroup.get(pass2)?.value;

      if(password1 !== password2){
        formGroup.get(pass2)?.setErrors({
          passwordIncorrect : true
        });

        return {
          passwordIncorrect : true
        }
        
      }else if(password2 == ''){
        return{
          required : true
        }
      }

      formGroup.get(pass2)?.setErrors(null);
      return null;
    };
  }

}
