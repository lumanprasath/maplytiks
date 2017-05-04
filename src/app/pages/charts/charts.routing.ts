import { Routes, RouterModule }  from '@angular/router';

import { Charts } from './charts.component';
import { ChartistJs } from './components/chartistJs/chartistJs.component';
import { ChartistJs2 } from './components/chartistJs2/chartistJs2.component';
import { BubbleMaps } from '../maps/components/bubbleMaps/bubbleMaps.component';
import { MaplytiksBrandwise } from './components/brandwise/brandwise.components';
//import { Maps } from '../maps/maps.component';


// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: '',
    component: Charts,
    children: [
      { path: 'chartist-js', component: ChartistJs },
      { path: 'chartist-js2', component: ChartistJs2 },
      { path: 'maplytiks-brandwise', component: MaplytiksBrandwise},
     { path: 'bubblemaps', component: BubbleMaps}
    ]
  }
];

export const routing = RouterModule.forChild(routes);