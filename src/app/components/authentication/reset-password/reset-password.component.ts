import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { LabelConstants } from 'src/app/shared/label.constant';
import { DialogData } from '../login/login.component';
import { ToastrService } from 'ngx-toastr';
import { AuthServiceService } from 'src/app/service/auth-service.service';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent {
hide = true;
label = LabelConstants;
ResetPasswordForm: FormGroup;

constructor(
  public dialogRef: MatDialogRef<ResetPasswordComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public dialog: MatDialog, private toastr: ToastrService, 
    private authservice: AuthServiceService,
 ) {}
 navigateToLogin() {
  this.dialogRef.close();
  this.toastr.success('Password reset successfully', 'Reset', {
    positionClass: 'toast-top-right'
  });
 }

 resetPassword(){
  this.authservice.tokenGenerate().subscribe((result: any) => {
    console.log(result);
    this.authservice.resetpasswordApi(this.ResetPasswordForm.value.password).subscribe((result:any) => {
      console.log(result);
      if(result.msg){
        this.toastr.success(result.msg,'Verify', {
          positionClass: 'toast-top-right'
        });
      this.dialogRef.close();
      }       
    
    },
    err=>console.log(err)
    );
  })
}



// ngOnInit() {
//   this.changePasswordForm = this.fb.group({
//     currentPassword: ['', Validators.required],
//     newPassword: ['', Validators.required],
//     confirmPassword: ['', Validators.required]
//   }, { validators: this.passwordMatchValidator });
// }

// changePassword() {
//   if (this.changePasswordForm.invalid) {
//     return;
//   }

//   // Code to call the password change API using a service
//   // Pass the values: this.changePasswordForm.value.currentPassword, this.changePasswordForm.value.newPassword
// }

// passwordMatchValidator(formGroup: FormGroup) {
//   const newPassword = formGroup.get('newPassword').value;
//   const confirmPassword = formGroup.get('confirmPassword').value;

//   if (newPassword !== confirmPassword) {
//     formGroup.get('confirmPassword').setErrors({ passwordMismatch: true });
//   } else {
//     formGroup.get('confirmPassword').setErrors(null);
//   }
// }




// // Initialize Userfront
// Userfront.init("demo1234");

// // 1. Reference the elements on the page
// var passwordResetFormEl = document.getElementById("password-reset-form");
// var alertEl = document.getElementById("alert");
// var passwordEl = document.getElementById("password");
// var passwordVerifyEl = document.getElementById("password-verify");

// // 2. Reset the user's password
// function formResetPassword(e) {
//   // Prevent the form's default behavior
//   e.preventDefault();
//   // Reset the alert to empty
//   setAlert();
//   // Verify that the passwords match
//   var password = passwordEl.value;
//   var passwordVerify = passwordVerifyEl.value;
//   if (password !== passwordVerify) {
//     return setAlert("Password verification must match.");
//   }
//   // Call Userfront.resetPassword()
//   Userfront.resetPassword({
//     password: password,
//   }).catch(function(error) {
//     setAlert(error.message);
//   });
// }

// // Set the alert element to show the message
// function setAlert(message) {
//   alertEl.innerText = message;
//   alertEl.style.display = message ? "block" : "none";
// }

// // 3. Add an event listener for the password reset form submit
// passwordResetFormEl.addEventListener("submit", formResetPassword);


// var password = passwordEl.value;
// var passwordVerify = passwordVerifyEl.value;
// if (password !== passwordVerify) {
//   return setAlert("Password verification must match.");
// }


// Catch the error
// Userfront.resetPassword(...)
// .catch(function(error) {
//   setAlert(error.message);
// });

// // Add the error message to the alert element
// function setAlert(message) {
//   alertEl.innerText = message;
//   alertEl.style.display = message ? "block" : "none";
// }
}