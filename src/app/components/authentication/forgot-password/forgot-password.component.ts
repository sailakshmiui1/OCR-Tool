import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LabelConstants } from 'src/app/shared/label.constant';
import { DialogData } from '../login/login.component';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { PassCodeComponent } from '../pass-code/pass-code.component';
import { AuthServiceService } from 'src/app/service/auth-service.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent {

  label = LabelConstants;
  animal: any;
  ForgotPasswordForm!: FormGroup; 
  constructor(private fb: FormBuilder, private router: Router,
    public dialogRef: MatDialogRef<ForgotPasswordComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public dialog: MatDialog,
    private authservice: AuthServiceService,
    private toastr: ToastrService
    ){}
    ngOnInit(): void {
      this.ForgotPasswordForm = this.fb.group({
        userName: ['', [Validators.required]]
      });
    }

    // get form() { return this.ForgotPasswordForm.controls; }
    navigate() {  
      if (!this.ForgotPasswordForm.valid) {
        return;
      }
      this.authservice.tokenGenerate().subscribe((result: any) => {
        console.log(result);
        this.authservice.resetpasswordSenderApi(this.ForgotPasswordForm.value.userName, result.access_token).subscribe((result:any) => {
          console.log(result);
          if(result.trans_id){
            this.toastr.success("otp has sent email",'Continue', {
              positionClass: 'toast-top-right'
            });
            this.dialogRef.close();
            this.openDialog(result.trans_id);
          }       
        
        },
        err=>console.log(err)
        );
      })
     
    }
        
    openDialog(transid): void {
      const dialogRef = this.dialog.open(PassCodeComponent, {
        width: '540px',
        height: '390px',
        data: {userName: this.ForgotPasswordForm.value.userName, trans_id: transid}
      });
  
      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
        this.animal = result;
      });
    }
  
    navigateBack() {
      this.dialogRef.close();
    }

   
  
  }
 