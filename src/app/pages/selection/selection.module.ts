import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';
import {HttpModule} from '@angular/http';
import {Selection} from './selection.component';
import { routing } from './selection.routing';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgaModule,
    routing,
    HttpModule,
  
   
  ],
  declarations: [
      Selection 
  ],
  providers: [

  ]
})
export default class SelectionModule {}


