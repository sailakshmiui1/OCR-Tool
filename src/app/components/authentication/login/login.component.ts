import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { LabelConstants } from 'src/app/shared/label.constant';
import { ToastrService } from 'ngx-toastr';
import {
  FormControl,
  FormGroupDirective,
  NgForm,
  FormGroup,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { ForgotPasswordComponent } from '../forgot-password/forgot-password.component';
import { AuthServiceService } from 'src/app/service/auth-service.service';

export interface DialogData {
  animal: string;
  name: string;
  
}
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  hide = true;
  showPassword = false;
  LoginForm!: FormGroup; 
  showPassHint = false;
  showError: boolean = false;
  emailFormControl: any
  incorrectPassword: boolean = false;
  label = LabelConstants;
    animal: any;
  userNameTF: string;
  passWordTF: string;
  totalAttempts: number = 5;
constructor(private fb: FormBuilder, private dialog: MatDialog, private toastr: ToastrService, private authservice: AuthServiceService){
}
ngOnInit(): void {
  this.LoginForm = this.fb.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required]]
  });
}

get form() { return this.LoginForm.controls; }

openDialog(): void {
  const dialogRef = this.dialog.open(ForgotPasswordComponent, {
    width: '430px',
    height: '400px',
    data: {}
  });

  dialogRef.afterClosed().subscribe((result: any) => {
    console.log('The dialog was closed');
    this.animal = result;
  });
}
userLogin() {
  if (!this.LoginForm.valid) {
    return;
  }
  
  this.authservice.tokenGenerate().subscribe((result: any) => {
    console.log(result);
    this.authservice.loginKeycloak(this.LoginForm.value, result.access_token).subscribe((result:any) => {
      console.log(result);
      
      this.authservice.loginApi(this.LoginForm.value, result.access_token).subscribe((result:any) => {
        console.log(result);
        if(result.user){
        this.authservice.setUserDetails(result.user)
       }
       console.log(this.authservice.getUserDetails().name)
        if (result.Errors) {
          this.toastr.error(result.Errors,'Login', {
            positionClass: 'toast-top-right'
          });
        } else {
          this.toastr.success(result.message,'Login', {
            positionClass: 'toast-top-right'
          });
        }
      }, (error) => {
        console.log(error);
        this.toastr.error(error?.error,'Try again', {
          positionClass: 'toast-top-right'
        });
      });
    }, (error) => {
      console.log(error);
      this.toastr.error(error?.error?.error_description, error?.error?.error, {
        positionClass: 'toast-top-right'
      });
    });
  }, (error) => {
    console.log(error);
    this.toastr.error(error?.error?.error_description, error?.error?.error, {
      positionClass: 'toast-top-right'
    });
  });
}

public togglePasswordVisibility(): void {
  this.showPassword = !this.showPassword;
}


executeLogin(): void {
  const userNameStr: string = this.userNameTF;
  const passWordStr: string = this.passWordTF;

  if (this.totalAttempts !== 0) {
    if (userNameStr === "temp" && passWordStr === "pass") {
      console.log("Correct");
    } else {
      console.log("Incorrect");
      this.totalAttempts--;
    }
  } else {
    console.log("Maximum number of attempts exceeded");
  }
}

}

