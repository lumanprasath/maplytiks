import {Component, ViewEncapsulation, Inject, Input, Output, EventEmitter, ViewChild,ElementRef, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {View} from "angular2/angular2";
import {HttpServices} from "../../shared/services/httpservice";
//import {LocalStorage, SessionStorage} from "angular2-localstorage/WebStorage";
import { LocalStorageService } from 'angular-2-local-storage';
import { LocalDataSource } from 'ng2-smart-table';

@Component({
  selector: 'dashboard',
  encapsulation: ViewEncapsulation.None,
  styles: [require('./dashboard.scss')],
  template: require('./dashboard.html')
})

export class Dashboard implements OnInit{
    private selected_match:any;
    private dropDownMatch:any[];
    private dropDownLeague:any[];
    private selected_league:any;
    public type:string;
    private selected_interval:any;
    private dropDownInterval:any[];
    private dropDownBrand:any[];
    private brand_list:any[];
    private selected_brand:any[];
    private allProjectData:any[];

     query: string = '';

  settings = {
    
    add: {
      addButtonContent: '<i class="ion-ios-plus-outline"></i>',
      createButtonContent: '<i class="ion-checkmark"></i>',
      cancelButtonContent: '<i class="ion-close"></i>',
    },
    edit: {
      editButtonContent: '<i class="ion-edit"></i>',
      saveButtonContent: '<i class="ion-checkmark"></i>',
      cancelButtonContent: '<i class="ion-close"></i>',
    },
    delete: {
      deleteButtonContent: '<i class="ion-trash-a"></i>',
      confirmDelete: true
    },
    actions:{
      columnTitle:'Project',
      add:false,
      edit:false,
      delete:false
      
    },
    
    columns: {
     
      sports: {
        title: 'Sports',
        type: 'string'
      },
      tournament: {
        title: 'Leauge',
        type: 'string'
      },
      servertype: {
        title: 'Server',
        type: 'string'
      },
      host: {
        title: 'Host',
        type: 'string'
      },
      inserted: {
        title: 'Submission',
        type: 'string'
      },
      
      brand: {
        title: 'Brand Details',
        type: 'custom'
        },
         status: {
        title: 'status',
        type: 'string'
      },
     }
  };

brandsettings = {
    
    add: {
      addButtonContent: '<i class="ion-ios-plus-outline"></i>',
      createButtonContent: '<i class="ion-checkmark"></i>',
      cancelButtonContent: '<i class="ion-close"></i>',
    },
    edit: {
      editButtonContent: '<i class="ion-edit"></i>',
      saveButtonContent: '<i class="ion-checkmark"></i>',
      cancelButtonContent: '<i class="ion-close"></i>',
    },
    delete: {
      deleteButtonContent: '<i class="ion-trash-a"></i>',
      confirmDelete: true
    },
    actions:{
      columnTitle:'Brands',
      add:false,
      edit:false,
      delete:false
    },
    
    columns: {
     
      brand: {
        title: 'Brand',
        type: 'string'
      },
      asset: {
        title: 'Asset',
        type: 'string'
      },
      tagline: {
        title: 'Tag Line',
        type: 'string'
      },
      imageupload: {
        title: 'Image',
        type: 'string'
      }
      
    }
  };

getTableData(data2,self){
  var data=[];
  self.allProjectData = data2;
  for(var i = 0; i < data2.length; i++){
    console.log(data2[i].brand_details);
    var d = {id:data2[i]._id, sports:data2[i].sports,tournament:data2[i].tournament,servertype:data2[i].servertype,host: data2[i].host,inserted:data2[i].inserted,status:data2[i].status,brand:data2[i].brand_details.length  }
    data.push(d);
  }
  
  self.source.load(data);
 
}
  constructor(private router: Router, private _httpService: HttpServices, private localStorageService: LocalStorageService) { }
    source: LocalDataSource = new LocalDataSource();
    brandsource: LocalDataSource = new LocalDataSource();


  ngOnInit(){
          
              // this.source.load(data);

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
              self.selected_match = self.dropDownMatch[0].match;

              this.overall()      
              var post_data ={userID:localStorage.getItem('user_id')}
              console.log(post_data);
              self.requestAllProjectList(post_data,self);

}



CustomEditorComponent(event): void {
    let self =this;
    var data = [];
    console.log( 'Custom event',event.data.id)
    var d =self.allProjectData;
    for(var i = 0; i <  d.length; i++){
     if(d[i]._id == event.data.id){
        var brand =  d[i].brand_details;
        for(var j = 0;j< brand.length; j++){
          var b = { id:j+1,brand:brand[j].street,asset:brand[j].asset,tagline:brand[j].tagline,imageupload:brand[j].imageupload}
          data.push(b)
        }
     } 
    }

      self.brandsource.load(data);

  }
  
  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }
  

OnChangeChannel(){
  let self = this;
  if(self.selected_league ==='AFL' ){
     var match_list = [{name: 'SYS Vs WBD',match: 'SYS vs WBD'}]
     self.dropDownMatch = match_list
     self.type = "afl_output_2016";
     self.selected_match = self.dropDownMatch[0].match;
  //   self.selected_brand =  self.allLogoLabels[0];
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



public makeRequest(self){
   
 if(self.asset_data!=="" && self.logo_data!=="" && self.logo_ele!=="" ){
    self.requestAssetAndLogoAndElement({"asset":self.asset_data,"logo":self.logo_data,logo_element:self.logo_ele,match:self.selected_match,type:self.type,interval:self.selected_interval},self);
  
  }else if(self.asset_data!=="" && self.logo_data!==""){
    self.requestAssetAndLogoExposure({"asset":self.asset_data,"logo":self.logo_data,match:self.selected_match,type:self.type,interval:self.selected_interval},self);
    self.logo_ele ==="";
  }else if(self.logo_data!=="" && self.logo_ele!=="") {
   self.requestLogoAndElementExposure({"logo":self.logo_data,"logo_element":self.logo_data,match:self.selected_match,type:self.type,interval:self.selected_interval},self);
   self.asset_data==="";
  }else if(self.asset_data!=="" && self.logo_ele!==""){
    self.requestAssetAndElementExposure({"asset":self.asset_data,"logo_element":self.logo_ele,match:self.selected_match,type:self.type,interval:self.selected_interval},self);
    self.logo_data==="";
  }else if(self.logo_data!==""){
    self.requestLogoExposure({"logo":self.logo_data,match:self.selected_match,type:self.type,interval:self.selected_interval},self);
    self.asset_data===""; self.logo_ele ==="";
  }else if(self.logo_ele!==""){
    self.requestElementExposure({"logo_element":self.logo_ele,match:self.selected_match,type:self.type,interval:self.selected_interval},self);
    self.asset_data===""; self.logo_data==="";
  }else if(self.asset_data!==""){
    self.requestAssetExposure({"asset":self.asset_data,match:self.selected_match,type:self.type,interval:self.selected_interval},self);
     self.logo_data==="";self.logo_ele ==="";
  }else{
    self.requestBrandExposure({match:self.selected_match,type:self.type,interval:self.selected_interval},self);
    self.asset_data===""; self.logo_data==="";self.logo_ele ==="";
  }

}




requestBrandExposure(post_data,self) {
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



requestAllProjectList(post_data,self){
self._httpService.PostHttp(JSON.stringify(post_data),"get_project_info")
            .subscribe(
            (data2) => {
            self.getTableData(data2,self);
           },
            (error) => {
               console.log(error);
            }
            );
}






getExposure(data,self){
            self.brands_exposure = data.brands_exposure;
 
}
  

processMaplytiksData(data,self){
          self.brand_exposure = data.brand_exposure;
     //     self.allData=  self.getChartValue(data.logoNames);
          self.allLogoLabels =  self.getChartLabel(data.logoNames);   
          self.selected_brand = self.allLogoLabels[0];    
}


getChartValue(data){
 var data = data;   
 var value = [];
        for (var i = 0; i < data.length; i++) {
            var obj = data[i];
            value.push(obj.unique_count.value);
        }
        return value;
}


getChartLabel(data){
 var data = data;   
 var label = [];
        for (var i = 0; i < data.length; i++) {
            var obj = data[i];
            label.push(obj.key);
        }
        //    console.log(label);
        return label;     
}


  clicked() {
    this.router.navigate(['/pages/newproject/formdetails-newproject']);
    //brand-form
  }

  clickmaplytiks() {

      let self =this;
    this.localStorageService.set('type', self.type);
    this.localStorageService.set('match', self.selected_match);
     this.localStorageService.set('interval', self.selected_interval);
    //     self.requestBrandExposure({match:self.selected_match,type:self.type,interval:self.selected_interval},self);
      //   this.localStorageService.set('someKey', 'someValue');
          //  this.localStorageService.set('someKey', 'someValue');
        this.router.navigate(['/pages/charts/chartist-js']);  
  }


clickbrandwisemaplytiks(){
    let self =this;
    this.localStorageService.set('type', self.type);
    this.localStorageService.set('match', self.selected_match);
    this.localStorageService.set('interval', self.selected_interval);
    this.localStorageService.set('logo', self.selected_brand);
    this.router.navigate(['/pages/charts/maplytiks-brandwise']);  
}



overall(){
    jQuery("#overall").show()
    jQuery("#brandwise").hide()
}


brandwise(){
     jQuery("#overall").hide()
    jQuery("#brandwise").show()
}


}





























