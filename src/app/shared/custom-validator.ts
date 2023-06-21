import { AbstractControl, ValidationErrors } from "@angular/forms";

export class CustomValidators {
   
  static passwordValidation(control: AbstractControl): ValidationErrors | null {
    debugger;
    const password = control.get('password')?.value;
    var  pattern = "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[!@#\$&*~]).{6,}$";

    if(!isNaN(password)) {
        
        return  null;
      }
      else if (password.length < 6|| password.length> 20 )
       {
        return { passwordsNotMatching: true };
       }
     
       else
       {
        return null;
       }

       
      }
    
  

}