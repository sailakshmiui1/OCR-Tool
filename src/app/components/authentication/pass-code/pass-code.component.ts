import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { LabelConstants } from 'src/app/shared/label.constant';
import { DialogData } from '../login/login.component';
import { ResetPasswordComponent } from '../reset-password/reset-password.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthServiceService } from 'src/app/service/auth-service.service';

@Component({
  selector: 'app-pass-code',
  templateUrl: './pass-code.component.html',
  styleUrls: ['./pass-code.component.scss']
})
export class PassCodeComponent {
label = LabelConstants;
  animal: any;
  PassCodeForm!: FormGroup;
  remainingTime: number;
  timerId: any;
 constructor(private fb: FormBuilder,
  public dialogRef: MatDialogRef<PassCodeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public dialog: MatDialog, private authservice: AuthServiceService,
    private toastr: ToastrService
 ) {}
 ngOnInit(): void {
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
// clearAllInputs(inputElement: HTMLInputElement) {
//   const allInputs = document.querySelectorAll('input[type="text"]');
//   allInputs.forEach((input: HTMLInputElement) => {
//     if (input !== inputElement) {
//       input.value = '';
//     }
//   });
// }

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
    this.animal = result;
  });
}

startTimer() {
  this.remainingTime = 300; // 5 minutes in seconds
  this.timerId = setTimeout(() => {
    // Timer logic when time is up
    // For example, display a message or perform any required action
  }, this.remainingTime * 1000);

  this.updateTimer();
}

updateTimer() {
  this.timerId = setInterval(() => {
    this.remainingTime--;

    if (this.remainingTime <= 0) {
      clearInterval(this.timerId);
    }
  }, 1000);
}

ngOnDestroy() {
  clearTimeout(this.timerId);
  clearInterval(this.timerId);
}
// navigate() {    
//    this.authservice.tokenGenerate().subscribe((result: any) => {
//     console.log(result);
//     this.authservice.resetpasswordSenderApi(this.PassCodeForm.value.userName, result.access_token).subscribe((result:any) => {
//       console.log(result);
//       if(result.msg){
//         this.toastr.success(result.msg,'Continue', {
//           positionClass: 'toast-top-right'
//         });
//       this.dialogRef.close();
//       }       
    
//     },
//     err=>console.log(err)
//     );
//   })
 
// }
otpVerify(){
  this.authservice.tokenGenerate().subscribe((result: any) => {
    console.log(result);
    this.authservice.otpVerificationApi(this.PassCodeForm.value.userName, result.access_token).subscribe((result:any) => {
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
