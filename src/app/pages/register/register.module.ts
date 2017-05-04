import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';
import {HttpModule} from '@angular/http';
//import {ToastModule, ToastOptions} from 'ng2-toastr/ng2-toastr';
import { Register } from './register.component';
import { routing }       from './register.routing';


@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NgaModule,
    routing,
    HttpModule
  ],
  declarations: [
    Register
  ]
})
export default class RegisterModule {}
