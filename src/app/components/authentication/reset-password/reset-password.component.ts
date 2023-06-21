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
}