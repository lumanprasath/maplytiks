import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';
import {HttpModule} from '@angular/http';


import { routing } from './charts.routing';
import { Charts } from './charts.component';
import { ChartistJs } from './components/chartistJs/chartistJs.component';
import { ChartistJs2} from './components/chartistJs2/chartistJs2.component';
import { MaplytiksBrandwise } from './components/brandwise/brandwise.components';
import { ChartistJsService } from './components/chartistJs/chartistJs.service';
import { ChartistJs2Service } from './components/chartistJs2/chartistJs2.service';
import { BrandLeagueService} from './components/brandwise/BrandLeague.service';
import { Maps } from '../maps/maps.component';
import { BubbleMaps } from '../maps/components/bubbleMaps/bubbleMaps.component';
import { BubbleMapsService } from '../maps/components/bubbleMaps/bubbleMaps.service';
import { TagCloudModule } from 'angular-tag-cloud-module';
import { Ng2GoogleChartsModule } from 'ng2-google-charts';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { Daterangepicker } from 'ng2-daterangepicker';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgaModule,
    routing,
    HttpModule,
    ChartsModule,
    TagCloudModule,
    Ng2GoogleChartsModule,
    Daterangepicker
   
   
  ],
  declarations: [
    Charts,
    ChartistJs,
    ChartistJs2,
    Maps,
    BubbleMaps,
    MaplytiksBrandwise
    

    
  ],
  providers: [
    ChartistJsService,
    ChartistJs2Service,
    BrandLeagueService,
    BubbleMapsService
 
  ]
})
export default class ChartsALLModule {}


