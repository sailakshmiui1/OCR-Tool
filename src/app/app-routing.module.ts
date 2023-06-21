import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FileUploadComponent } from './components/overview/file-upload/file-upload.component';
import { LoginComponent } from './components/authentication/login/login.component';
import { FailedDocumentComponent } from './components/overview/dashboard/failed-document/failed-document.component';
import { UserListComponent } from './components/overview/dashboard/user-list/user-list.component';
import { SignUpComponent } from './components/authentication/sign-up/sign-up.component';
import { ConvertedDocumentComponent } from './components/overview/dashboard/converted-document/converted-document.component';
import { ConvertedDocPreviewComponent } from './components/overview/file-upload/converted-doc-preview/converted-doc-preview.component';
import { DeletedDocumentComponent} from './components/overview/dashboard/deleted-document/deleted-document.component';
import { LandingPageComponent } from './components/overview/landing-page/landing-page.component';

const routes: Routes = [
  {path: '', redirectTo:'/login', pathMatch:'full'},
  {path: 'login', component: LoginComponent},
  { path: 'fileupload', component:  FileUploadComponent},
  {path:'faileddocument',component: FailedDocumentComponent},
  {path:'converteddocuments', component:ConvertedDocumentComponent},
  {path:'converted-doc-preview', component:ConvertedDocPreviewComponent},
  {path:'deleteddocuments', component:DeletedDocumentComponent},
  {path:'userlist',component:UserListComponent},
  {path:'signup',component:SignUpComponent},
  {path:'landingpage',component:LandingPageComponent},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
