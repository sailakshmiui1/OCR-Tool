
import { Component, ContentChild, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CountryISO, SearchCountryField, PhoneNumberFormat } from "ngx-intl-tel-input";
import { LabelConstants } from 'src/app/shared/label.constant';
import { MatSnackBar } from "@angular/material/snack-bar";
import { FormControl, FormGroupDirective, NgForm, FormGroup, Validators, FormBuilder, } from '@angular/forms';
import { CustomValidators } from '../../../shared/custom-validator';
import { AuthServiceService } from 'src/app/service/auth-service.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  public showPassword: boolean = false;
  emailerror = false;
  showPassHint = false;
  usernameerror = false;
  hide = true;
  SignupForm: FormGroup;
  phoneNumber: any;
  username: any;
  emailFormControl: any;
  @Input() hint!: string;
  label = LabelConstants;
  @ViewChild('signUpForm') signUpForm: NgForm;
  constructor(private fb: FormBuilder,
              private authService: AuthServiceService,
              private toastr: ToastrService,
              private router: Router) {
    this.SignupForm = this.fb.group({
      username: new FormControl('', [Validators.required]),
      email: new FormControl('', [
        Validators.required,
        Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
      password: new FormControl('', [
        Validators.required,
        Validators.pattern("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[!@#\$&*~]).{6,}$")]),
      phone : new FormControl('') 

    });
    debugger;
    this.getErrorMessage();

  }
  ngOnInit(): void {
  }
  createUser() {
    console.warn(this.SignupForm.value);
    debugger;
    if (this.SignupForm.valid) {

      this.authService.tokenGenerate().subscribe((result: any) => {
        debugger;
        console.log(result);

        this.authService.createUser(this.SignupForm.value, result.access_token).subscribe((response: any) => {
debugger;
if (response !=null)
{
  setTimeout(() => {
    this.toastr.success('User Created successfully', 'Sign up', {
    positionClass: 'toast-top-right'
  });
}, 5000);
}

this.router.navigate(['/login']);
          console.log(response);
          },
        error => {
          console.log(error);
          setTimeout(() => {
            this.toastr.error(error.error.errorMessage, 'Sign up', {
            positionClass: 'toast-top-right'
          });
        }, 1000);
        this.signUpForm.resetForm();
     },);
      },
      error => {
        setTimeout(() => {
          this.toastr.error('User Creation failed', 'Sign up', {
          positionClass: 'toast-top-right'
        });
      }, 5000);
      this.signUpForm.resetForm();
   },
      );
    }
  }

  getErrorMessage() {
    debugger;
    if (this.SignupForm.controls['password'].hasError('pattern')) {
      this.showPassHint = true;
    }
    else { this.showPassHint = false; }

  }

  public togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  get phoneValue() {
    return this.SignupForm.controls['phone']
  }

}

