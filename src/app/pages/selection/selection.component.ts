import {Component, ViewEncapsulation} from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {HttpServices} from "../../shared/services/httpservice";

@Component({
  selector: 'selection',
  encapsulation: ViewEncapsulation.None,
  styles: [require('chartist/dist/chartist.css'), require('./selection.scss')],
  template: require('./selection.html')
})


export class Selection {
    private selected_match:any;
    private dropDownMatch:any[];
    private dropDownLeague:any[];
     private selected_league:any;
    public type:string;
     private selected_interval:any;
     private dropDownInterval:any[];

  constructor(private router: Router, private _httpService: HttpServices) {
    
  }




ngOnit(){
              
              let self = this;
              var match_list = [{name: 'SYS Vs WBD',match: 'SYS vs WBD'}]
              self.dropDownMatch = match_list
              self.selected_match = self.dropDownMatch[0].match;

              var league_list = [{name: 'AFL',league: 'AFL' },{name: 'PKL',league: 'PKL' }]
              self.dropDownLeague = league_list
              self.selected_league = self.dropDownLeague[0].league;

              var interval_list = [{name:'2 secs', value:'2s'},{name:'30 secs', value:'30s'},{name:'2 mins', value:'2m'},{name:'5 mins', value:'5m'},{name:'10 mins', value:'10m'}]
              self.dropDownInterval = interval_list
              self.selected_interval = self.dropDownInterval[3].value;
              self.type = "afl_output_2016";
              self.requestBrandExposure({match:self.selected_match,type:self.type,interval:self.selected_interval},self);
}



requestBrandExposure(post_data,self){
self._httpService.PostHttp(JSON.stringify(post_data),"brand_exposure")
            .subscribe(
            (data2) => {
             self.getExposure(data2,self);
             self.processMaplytiksData(data2,self);
            },
            (error) => {
               console.log(error);
            }
            );
}


OnChangeChannel(){
  let self = this;
  if(self.selected_league ==='AFL' ){
     var match_list = [{name: 'SYS Vs WBD',match: 'SYS vs WBD'}]
     self.dropDownMatch = match_list
     self.type = "afl_output_2016";
     self.selected_match = self.dropDownMatch[0].match;
  }
   if(self.selected_league ==='AFL_1' ){
     var match_list = [{name: 'SYS vs WBD_1',match: 'SYS vs WBD_1'}]
     self.dropDownMatch = match_list
     self.type = "afl_output_2016_1";
     self.selected_match = self.dropDownMatch[0].match;
  }
  if(self.selected_league ==='PKL' ){
     var match_list = [{name: 'PP vs JPP',match: 'PP vs JPP'}]
     self.dropDownMatch = match_list
     self.type = "pkl_output_2016";
     self.selected_match = self.dropDownMatch[0].match;
  }
  self.requestBrandExposure({match:self.selected_match,type:self.type,interval:self.selected_interval},self);
}

  clicked() {
   
    this.router.navigate(['/pages/newproject/gamedetails']);
    //brand-form

  }

  clickmaplytiks() {
    this.router.navigate(['/pages/charts/chartist-js']);
    //brand-form
  }
  

}
