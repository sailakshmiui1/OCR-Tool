import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { LabelConstants } from 'src/app/shared/label.constant';
import { DialogData } from '../login/login.component';
import { ResetPasswordComponent } from '../reset-password/reset-password.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthServiceService } from 'src/app/service/auth-service.service';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-pass-code',
  templateUrl: './pass-code.component.html',
  styleUrls: ['./pass-code.component.scss']
})
export class PassCodeComponent {
label = LabelConstants;
  PassCodeForm!: FormGroup;
  remainingTime: number = 30;
  timerSubscription: Subscription | undefined;
  userName: any;
  trans_id: any;
  otp: number;
  showOtpComponent = true;
  config = {
    allowNumbersOnly: false,
    length: 4,
    isPasswordInput: false,
    disableAutoFocus: false,
    placeholder: '',
    inputStyles: {
      'width': '40px',
      'height': '45px',
      'border-radius': '16px',
      'outline': 'none',
    'margin-bottom': '20px',
    'margin-right': '28px',
    'font-size': '22px'
    }
  };

 constructor(private fb: FormBuilder,
  public dialogRef: MatDialogRef<PassCodeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialog: MatDialog, private authservice: AuthServiceService,
    private toastr: ToastrService
 ) {}
 ngOnInit(): void {
  this.userName = this.data.userName;
  this.trans_id = this.data.trans_id;
  this.startTimer();

}

 openDialog(): void {
  const dialogRef = this.dialog.open(ResetPasswordComponent, {
    width: '540px',
    height: 'auto',
    data: {userName: this.userName,}
  });
  
  dialogRef.afterClosed().subscribe(result => {
    console.log('The dialog was closed');
  });
}

startTimer(): void {
  this.timerSubscription = interval(1000).subscribe(() => {
    this.remainingTime--;
    if (this.remainingTime === 0) {
      this.stopTimer();
    }
  });
}

stopTimer(): void {
  if (this.timerSubscription) {
    this.timerSubscription.unsubscribe();
  }
}

formatTime(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${this.padZero(minutes)}:${this.padZero(remainingSeconds)}`;
}

padZero(value: number): string {
  return value.toString().padStart(2, '0');
}
ngOnDestroy() {
  this.stopTimer();
}

resendOtp() {     
  if (this.userName) {
  this.authservice.tokenGenerate().subscribe((result: any) => {
    console.log(result);
    this.authservice.resetpasswordSenderApi(this.userName, result.access_token).subscribe((result:any) => {
      if(result.trans_id){
        this.toastr.success("otp sent to email-id",'Continue', {
          positionClass: 'toast-top-right'
        });
        this.remainingTime = 300;
      }
    },
    err=>{
      this.toastr.error(err?.error?.detail,'Try again', {
        positionClass: 'toast-top-right'
      });
    }
    );
  })
}
}

otpVerify(){
  // this.dialogRef.close();
  //       this.openDialog();
  if (this.otp.toString().length == 4) {
    this.authservice.tokenGenerate().subscribe((result: any) => {
      console.log(result);
      this.authservice.otpVerificationApi(this.otp, this.trans_id, result.access_token).subscribe((result:any) => {
        console.log(result);
        if(result.msg){
          this.toastr.success(result.msg,'Verify', {
            positionClass: 'toast-top-right'
          });
        this.dialogRef.close();
        this.openDialog();
        }       
      
      },
      err=>{
        this.toastr.error(err?.error?.detail,'Try again', {
          positionClass: 'toast-top-right'
        });
      }
      );
    })
  }
}
onOtpChange(otp) {
  this.otp = otp;
  console.log("Text is otp ", this.otp )
}

}
