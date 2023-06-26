import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { LabelConstants } from 'src/app/shared/label.constant';
import { DialogData } from '../login/login.component';
import { ToastrService } from 'ngx-toastr';
import { AuthServiceService } from 'src/app/service/auth-service.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit{
hide = true;
hides = true;
label = LabelConstants;
ResetPasswordForm: FormGroup;

constructor(
  public dialogRef: MatDialogRef<ResetPasswordComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public dialog: MatDialog, private toastr: ToastrService, 
    private authservice: AuthServiceService,
    private formBuilder: FormBuilder
 ) {}


ngOnInit() {
  this.ResetPasswordForm = this.formBuilder.group(
  {
  newPassword: ['', [Validators.required, Validators.pattern("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[!@#\$&*~]).{6,}$")]],
  confirmPassword: ['', Validators.required]
      },
       );

   this.ResetPasswordForm.setValidators(this.passwordMatchValidator);
   }

   navigateToLogin() {
       this.dialogRef.close();
       this.toastr.success('Password reset successfully', 'Reset', {
        positionClass: 'toast-top-right'
       });
     }

     resetPassword() {
          if (this.ResetPasswordForm.valid) {
          this.authservice.tokenGenerate().subscribe((result: any) => {
            console.log(result);
            this.authservice.resetpasswordApi(this.ResetPasswordForm.value.newPassword).subscribe(
              (result: any) => {
                console.log(result);
                if (result.msg) {
                  this.toastr.success(result.msg, 'Verify', {
                    positionClass: 'toast-top-right'
                  });
                  this.dialogRef.close();
                }
              },
              err => console.log(err)
            );
          });
        }
        }
        passwordMatchValidator(group: FormGroup) {
              const password = group.get('newPassword').value;
              const confirmPassword = group.get('confirmPassword').value;
          
              if (password !== confirmPassword) {
                return { passwordMismatch: true };
             }
          
              return null;
            }
           
}