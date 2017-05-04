import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';
import { routing} from './admin.routing';
import { FormWizardModule } from 'angular2-wizard';
import { LocalStorageService } from 'angular-2-local-storage';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { Admin } from './project/admin.component'
import { AdminProject } from './admin_project.component' 
import { AdminLogin } from './login/adminlogin.component';
import {ToastModule, ToastOptions} from 'ng2-toastr/ng2-toastr';
import {HttpModule} from '@angular/http';






@NgModule({
  imports: [
    CommonModule, 
    FormsModule,
    ReactiveFormsModule,
    NgaModule,    
    routing,
    Ng2SmartTableModule,
     FormWizardModule,
     HttpModule
  ],
  declarations: [
    Admin,
    AdminProject,
    AdminLogin
  ],
  providers: [
   LocalStorageService
 ]
})
export default class AdminModule {}







