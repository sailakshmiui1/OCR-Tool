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
  remainingTime: number = 300;
  timerSubscription: Subscription | undefined;
  userName: any;

 constructor(private fb: FormBuilder,
  public dialogRef: MatDialogRef<PassCodeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialog: MatDialog, private authservice: AuthServiceService,
    private toastr: ToastrService
 ) {}
 ngOnInit(): void {
  this.userName = this.data.userName;
  this.PassCodeForm = this.fb.group({
    passCode1: ['', [Validators.required]],
    passCode2: ['', [Validators.required]],
    passCode3: ['', [Validators.required]],
    passCode4: ['', [Validators.required]]
  });
  this.startTimer();

}
onOtpInput(event: any, currentInput: HTMLInputElement, nextInput: HTMLInputElement, previousInput: HTMLInputElement) {
  const otpValue = currentInput.value;
  const maxLength = parseInt(currentInput.getAttribute('maxlength') || '1', 10);

  if (otpValue.length >= maxLength) {
    nextInput.focus();
  }
    else if(event.inputType === 'deleteContentBackward' && otpValue.length === 0){
    previousInput.focus();
  } else if(otpValue.length >= maxLength){
    previousInput.focus();
  }

}


 Navigate() {
  this.dialogRef.close();
  this.openDialog();
 }
 openDialog(): void {
  const dialogRef = this.dialog.open(ResetPasswordComponent, {
    width: '540px',
    height: '510px',
    data: {}
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
    err=>console.log(err)
    );
  })
}
}

otpVerify(){
  if (this.PassCodeForm.valid) {
    const passCodeValues = Object.values(this.PassCodeForm.getRawValue());
    const passCode = passCodeValues.join('');
    this.authservice.tokenGenerate().subscribe((result: any) => {
      console.log(result);
      this.authservice.otpVerificationApi(passCode, result.access_token).subscribe((result:any) => {
        console.log(result);
        if(result.msg){
          this.toastr.success(result.msg,'Verify', {
            positionClass: 'toast-top-right'
          });
        this.dialogRef.close();
        this.openDialog();
        }       
      
      },
      err=>console.log(err)
      );
    })
  }
  const passCodeValues = Object.values(this.PassCodeForm.getRawValue());
    const passCode = passCodeValues.join('');  
}

}
