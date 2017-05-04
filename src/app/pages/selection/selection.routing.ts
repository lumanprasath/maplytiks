import { Routes, RouterModule }  from '@angular/router';
import {Selection} from './selection.component';



// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: '',
    component: Selection
  }
];

export const routing = RouterModule.forChild(routes);

