import { Routes, RouterModule }  from '@angular/router';

import { Admin } from './project/admin.component';
import { AdminLogin } from './login/adminlogin.component';
import { AdminProject } from './admin_project.component';


// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: '',
    component:AdminProject,
     children: [
        { path: 'all-projects', component: Admin },
        { path: 'all-login', component: AdminLogin },
   ]
  }
];

export const routing = RouterModule.forChild(routes);
