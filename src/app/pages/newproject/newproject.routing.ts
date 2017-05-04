import { Routes, RouterModule }  from '@angular/router';
import {GameDetails } from './components/gamedetails/gamedetails.component';
import { Newproject } from './newproject.component';
import {BrandDetails} from './components/branddetails/branddetails.component';
import {VideoDetails}  from './components/videodetails/videodetails.component';
import {FormDetailsNewproject} from './newproject.form.component';
// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: '',
    component: Newproject,
    children: [
        { path: 'gamedetails', component: GameDetails },
            { path: 'branddetails', component: BrandDetails },
             { path: 'videodetails', component: VideoDetails },
             { path: 'videodetails', component: VideoDetails },
             { path: 'formdetails-newproject', component: FormDetailsNewproject }
  
    ]
  }
];

export const routing = RouterModule.forChild(routes);