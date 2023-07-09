import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatCardModule} from '@angular/material/card';
import { FileUploadModule } from 'ng2-file-upload';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatDialogModule} from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { MatTableModule} from '@angular/material/table';
import { ToastrModule } from 'ngx-toastr';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/authentication/login/login.component';
import { SignUpComponent } from './components/authentication/sign-up/sign-up.component';
import { ForgotPasswordComponent } from './components/authentication/forgot-password/forgot-password.component';
import { HeaderComponent } from './components/overview/common/header/header.component';
import { FooterComponent } from './components/overview/common/footer/footer.component';
import { SidebarComponent } from './components/overview/common/sidebar/sidebar.component';
import { DashboardComponent } from './components/overview/dashboard/dashboard.component';
import { ConvertedDocumentComponent } from './components/overview/dashboard/converted-document/converted-document.component';
import { DeletedDocumentComponent } from './components/overview/dashboard/deleted-document/deleted-document.component';
import { FailedDocumentComponent } from './components/overview/dashboard/failed-document/failed-document.component';
import { UserListComponent } from './components/overview/dashboard/user-list/user-list.component';
import { SettingComponent } from './components/overview/dashboard/setting/setting.component';
import { LandingPageComponent } from './components/overview/landing-page/landing-page.component';
import { FileUploadComponent } from './components/overview/file-upload/file-upload.component';
import { UploadedFilelistModalComponent } from './components/overview/file-upload/uploaded-filelist-modal/uploaded-filelist-modal.component';
import { NgxMatIntlTelInputComponent } from 'ngx-mat-intl-tel-input';
import {  ReactiveFormsModule } from '@angular/forms';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import { MatSortModule } from '@angular/material/sort';
import { PreviewScreenPopupComponent } from './components/overview/file-upload/preview-screen-popup/preview-screen-popup.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import {MatDividerModule} from '@angular/material/divider';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MatRadioModule} from '@angular/material/radio';
import {MatPaginatorModule} from '@angular/material/paginator';
import { FormsModule } from '@angular/forms';
import { ConvertedDocPreviewComponent } from './components/overview/file-upload/converted-doc-preview/converted-doc-preview.component';
import { ProfilePopupComponent } from './components/overview/common/header/profile-popup/profile-popup.component';
import { FooterBottomComponent } from './components/overview/common/footer/footer-bottom/footer-bottom.component';
import { ResetPasswordComponent } from './components/authentication/reset-password/reset-password.component';
import { PassCodeComponent } from './components/authentication/pass-code/pass-code.component';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { HttpClientModule } from '@angular/common/http';
import { NgOtpInputModule } from 'ng-otp-input';
// import { NgOtpInputComponent } from './components/authentication/ng-otp-input/ng-otp-input.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignUpComponent,
    ForgotPasswordComponent,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    DashboardComponent,
    ConvertedDocumentComponent,
    DeletedDocumentComponent,
    FailedDocumentComponent,
    UserListComponent,
    SettingComponent,
    LandingPageComponent,
    FileUploadComponent,
    UploadedFilelistModalComponent,
    PreviewScreenPopupComponent,
    ConvertedDocPreviewComponent,
    ProfilePopupComponent,
    FooterBottomComponent,
    ResetPasswordComponent,
    PassCodeComponent,
    // NgOtpInputComponent

  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    MatCardModule,
    FileUploadModule,
    MatProgressBarModule,
    MatDialogModule,
    MatToolbarModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatMenuModule,
    MatSidenavModule,
    MatListModule,
    MatToolbarModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSortModule,
    MatTableModule,
    MatPaginatorModule,
    MatRadioModule,
    MatDividerModule,
    ToastrModule.forRoot(),
    NgxMatIntlTelInputComponent,
    MatDialogModule,
    MatProgressBarModule,
    NgxExtendedPdfViewerModule,
    CKEditorModule,
    HttpClientModule,
    NgOtpInputModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
