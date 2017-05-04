import {Component, ViewEncapsulation, Inject, Input, Output, EventEmitter, ViewChild,ElementRef, OnInit  } from '@angular/core';
import {View} from "angular2/angular2";
import {HttpServices} from "../../../../shared/services/httpservice";
import {BaThemeConfigProvider, layoutPaths} from '../../../../theme';
import { DaterangepickerConfig } from 'ng2-daterangepicker';
import * as moment from 'moment';
import {BaThemePreloader} from '../../../../theme/services';
import {GoogleChart} from './directives/angular2-google-chart.directive';
import '../../../../theme/components/baAmChart/baAmChart.loader.ts';
import {BaAmChartThemeService} from '../../../../theme/components/baAmChart/baAmChartTheme.service';
import { LocalStorageService } from 'angular-2-local-storage';
import { Router, ActivatedRoute, Params } from '@angular/router';




@Component({
  selector: 'maplytiks-brandwise',
  encapsulation: ViewEncapsulation.None,
  styles: [require('chartist/dist/chartist.css'), require('./brandwise.scss')],
  template: require('./brandwise.html'),
  providers: [BaAmChartThemeService]

  })




export class MaplytiksBrandwise implements OnInit{
 
 private selected_match:any;
 private dropDownMatch:any[];
 private dropDownLeague:any[];
 private dropDownInterval:any[];
 private selected_league:any;
 private selected_interval:any;
 private gaugeChartOptions:any;
 private totalFrameCount:string;
 private totalExposureTime:string;
 private selected_category: any;
 private dropDownlogocategory: any;
 private selected_section:any;
 private dropDownMatchSection:any[];
 private selected_brand:any;
 
  public topAssetData:any[]; 
  public topAssetLabels:string[];
  public topAssetChartType:string;
  public topAssetLegend:boolean = false;
  private topAssetColor:any[];


  public areaAssetData:any[]; 
  public areaAssetLabels:string[];
  public areaAssetChartType:string;
  public areaAssetLegend:boolean = false;
  private areaAssetColor:any[];

public topAssetWiseData:any[]; 
  public topAssetWiseLabels:string[];
  public topAssetWiseChartType:string;
  public topAssetWiseLegend:boolean = false;
  private topAssetWiseColor:any[];

  public contiData:any[];
  public contilabel:string[];
  public contiChartType:string;
  private contiChartColor:any[];


  public topLogoLegend:boolean = false;
  public topLogoType:string;
  public topLogoLabels:string[]; 
  public topLogoData:any[];
  public allData:any[];
  public allLogoLabels:string[]; 
  data2:any;
  public words:any[];
  public asset_data:string="";
  public logo_data:string="";
  public type:string;
  public logo_ele:string="";
 
  public topAllAssetData:any[]; 
  public topAllAssetLabels:string[];

  public lineChartLegend:boolean = true;
  public lineChartType:string = 'line';
  public lineChartColors:Array<any> = [];
  public lineChartData:any = []
  public lineChartLabels:any = [];
  private brands_exposure:string;
  
  public allLineChartData:any = []
  public allLineChartLabels:any = [];

  public topAreaLegend:boolean = false;
  public topAreaType:string;
  public topAreaLabels:string[]; 
  public topAreaData:any[];
  private topAreaColor: any[];

   public logo_type_Lab:string[]; 
  public logo_type_val:any[];

  public assetFrameData: any[];
  public assetFrameLabels: any = [];
  public assetFrameChartType: string;
  public assetFrameLegend:boolean =  true;


  public barChartLabels:string[];
  public barChartType:string = 'horizontalBar';
  public barChartLegend:boolean = false;
 
  public barChartData:any[];

  


  @ViewChild('baAmChart') private _selector:ElementRef;

  chartData:Object;
  scatterChartOptions:any;
 

  constructor(private _baConfig:BaThemeConfigProvider, private _httpService: HttpServices, private router: Router,
  private daterangepickerOptions: DaterangepickerConfig,
  private _baAmChartThemeService:BaAmChartThemeService, private localStorageService: LocalStorageService) {
    this._loadChartsLib();
    this.daterangepickerOptions.settings = {
           locale: { format: 'YYYY-MM-DD' },
           minDate: '2016-11-11',
           maxDate: '2016-11-30',
           alwaysShowCalendars: false,
           ranges: {
          'Today': [moment(), moment()],
          'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
          'Last 7 Days': [moment().subtract(6, 'days'), moment()],
          'Last 30 Days': [moment().subtract(29, 'days'), moment()],
          'This Month': [moment().startOf('month'), moment().endOf('month')],
          'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
           }
       };




 }

  private _loadChartsLib():void {
    BaThemePreloader.registerLoader(new Promise((resolve, reject) => {
      let amChartsReadyMsg = 'AmCharts ready';

      if (AmCharts.isReady) {
        resolve(amChartsReadyMsg);
      } else {
        AmCharts.ready(function () {
          resolve(amChartsReadyMsg);
        });
      }
    }));
  }


//   private timeFormatChange(){
//      var sec_num1 = parseInt(asecs, 10); // don't forget the second param
//        var hours1   = Math.floor(sec_num1 / 3600);
//        var minutes1 = Math.floor((sec_num1 - (hours1 * 3600)) / 60);
//        var seconds1 = sec_num1 - (hours1 * 3600) - (minutes1 * 60);
//        if (hours1   < 10) { var hours2   = "0"+hours1;}
//        if (minutes1 < 10) {var minutes2 = "0"+minutes1;}
//        if (seconds1 < 10) {var seconds2 = "0"+seconds1;}
//  }



  ngOnInit() {

  
               AmCharts.themes.blur = this._baAmChartThemeService.getTheme();
               let self = this;
               
               self.words = [ { text: 'Coca-Cola', weight: 1466 }, { text: 'Coca', weight: 1080 }, { text: 'Cola', weight: 1024 }, { text: 'Christmas', weight: 647 }, { text: 'advert', weight: 582 }, { text: 'Coke', weight: 417 }, { text: 'cola', weight: 372 }, { text: 'Zero', weight: 323 }, { text: 'way', weight: 322 }, { text: 'coca', weight: 322 }, { text: 'Diet', weight: 319 }, { text: '#MasterTheChoiceIMAXSweepstakes', weight: 313 }, { text: 'Rebellion', weight: 313 }, { text: 'Empire', weight: 312 }, { text: 'Rogue', weight: 303 }, { text: 'Either', weight: 302 }, { text: '#HolidaysAreComing',weight: 232 } ];
               jQuery("#col1").jQCloud(self.words,{
                      autoResize: true,
                        colors: ['#3b5998','#e9573f','#f6bb42', '#00b1e1', '#37bc9b', '#8cc152','#db4b3a','#0073B7', '#2BC6FF', '#CAD62C', '#E05C6B', '#FF8787','#031D44', '#04395E','#70A288','#DAB785','#D5896F','#66D7D1','#66D7D1','#454B66','#9CA3DB','#D89D6A','#6D454C', 
                        '#4B5B86','#9EACD1','#1D2332','#394564','#9DBA7D','#62744E','#A1A345','#5C5D28','#6E8789','#C2D1B2','#7E8D6E','#2B9EB3','#44AF69']
               });
               self.lineChartData =[ {data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A',fill: false, fillColor: "rgba(0,0,0,0)", strokeColor: "rgba(220,220,220,1)", pointColor: "rgba(200,122,20,1)"}, {data: [15, 9, 8, 4, 6, 25, 10], label: 'Series B',fill: false}, {data: [165, 259, 180, 181, 156, 155, 140], label: 'Series B',fill: false} ];

         

               self.lineChartLabels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

             

              self.logo_type_val = [ {data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B'}];
              self.logo_type_Lab = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
       


              self.topAssetData = [{data: [65, 59, 80, 81, 56, 55, 40], label: 'Asset Exposure'}];
              self.topAssetChartType = 'horizontalBar';
              self.topAssetLabels = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
              self.topAssetColor = [{
              backgroundColor:['#3b5998','#e9573f','#f6bb42', '#00b1e1', '#37bc9b', '#8cc152','#db4b3a', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)', 'rgba(75, 192, 192, 1)', 'rgba(153, 102, 255, 1)', 'rgba(255, 159, 64, 1)','rgba(0,10,220,1)','rgba(220,0,10,1)','rgba(220,0,0,1)','rgba(120,250,120,0.5)','rgba(255, 206, 86, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(153, 102, 255, 0.2)', 'rgba(255, 159, 64, 0.2)','rgba(0,10,220,0.5)','rgba(220,0,10,0.5)','rgba(220,0,0,0.5)','rgba(120,250,120,0.5)','rgba(255, 206, 86, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(153, 102, 255, 0.2)', 'rgba(255, 159, 64, 0.2)','rgba(0,10,220,0.5)','rgba(220,0,10,0.5)','rgba(220,0,0,0.5)','rgba(120,250,120,0.5)','rgba(255, 206, 86, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(153, 102, 255, 0.2)', 'rgba(255, 159, 64, 0.2)','rgba(0,10,220,0.5)','rgba(220,0,10,0.5)','rgba(220,0,0,0.5)','rgba(120,250,120,0.5)','rgba(255, 206, 86, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(153, 102, 255, 0.2)', 'rgba(255, 159, 64, 0.2)','rgba(0,10,220,0.5)','rgba(220,0,10,0.5)','rgba(220,0,0,0.5)','rgba(120,250,120,0.5)'],
                  hoverBackgroundColor:"#169abb",
                 
                  hoverBorderColor:"#169abb"
                }];


                  self.areaAssetData = [{data: [65, 59, 80, 81, 56, 55, 40], label: 'Asset Exposure'}];
              self.areaAssetChartType = 'bar';
              self.areaAssetLabels = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
              self.areaAssetColor = [{
              backgroundColor:['#3b5998','#e9573f','#f6bb42', '#00b1e1', '#37bc9b', '#8cc152','#db4b3a', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)', 'rgba(75, 192, 192, 1)', 'rgba(153, 102, 255, 1)', 'rgba(255, 159, 64, 1)','rgba(0,10,220,1)','rgba(220,0,10,1)','rgba(220,0,0,1)','rgba(120,250,120,0.5)','rgba(255, 206, 86, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(153, 102, 255, 0.2)', 'rgba(255, 159, 64, 0.2)','rgba(0,10,220,0.5)','rgba(220,0,10,0.5)','rgba(220,0,0,0.5)','rgba(120,250,120,0.5)','rgba(255, 206, 86, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(153, 102, 255, 0.2)', 'rgba(255, 159, 64, 0.2)','rgba(0,10,220,0.5)','rgba(220,0,10,0.5)','rgba(220,0,0,0.5)','rgba(120,250,120,0.5)','rgba(255, 206, 86, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(153, 102, 255, 0.2)', 'rgba(255, 159, 64, 0.2)','rgba(0,10,220,0.5)','rgba(220,0,10,0.5)','rgba(220,0,0,0.5)','rgba(120,250,120,0.5)','rgba(255, 206, 86, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(153, 102, 255, 0.2)', 'rgba(255, 159, 64, 0.2)','rgba(0,10,220,0.5)','rgba(220,0,10,0.5)','rgba(220,0,0,0.5)','rgba(120,250,120,0.5)'],
                  hoverBackgroundColor:"#169abb",
                 
                  hoverBorderColor:"#169abb"
                }];

                
               self.assetFrameData = [{data: [65, 59, 80, 81, 56, 55, 40], label: 'Asset Frames Exposure'}];
              self.assetFrameChartType = 'pie';
              self.assetFrameLabels = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
              self.topAssetWiseColor = [{
              backgroundColor:[  '#3b5998','#e9573f','#f6bb42', '#00b1e1', '#37bc9b', '#8cc152','#db4b3a', 'rgba(255, 159, 64, 1)','rgba(0,10,220,1)','rgba(220,0,10,1)','rgba(220,0,0,0.5)','rgba(120,250,120,0.5)','rgba(255, 206, 86, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(153, 102, 255, 0.2)', 'rgba(0,10,220,0.5)','rgba(220,0,10,0.5)','rgba(220,0,0,0.5)','rgba(120,250,120,0.5)'],
                hoverBackgroundColor:"#169abb",
                  
                  hoverBorderColor:"#169abb"
                }];

              // self.topAssetWiseData = [{data: [65, 59, 80, 81, 56, 55, 40], label: 'Asset Exposure'}];
              // self.topAssetWiseChartType = 'bar';
              // self.topAssetWiseLabels = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
              // self.topAssetWiseColor = [{
              // backgroundColor:[  '#3b5998','#e9573f','#f6bb42', '#00b1e1', '#37bc9b', '#8cc152','#db4b3a', 'rgba(255, 159, 64, 1)','rgba(0,10,220,1)','rgba(220,0,10,1)','rgba(220,0,0,0.5)','rgba(120,250,120,0.5)','rgba(255, 206, 86, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(153, 102, 255, 0.2)', 'rgba(0,10,220,0.5)','rgba(220,0,10,0.5)','rgba(220,0,0,0.5)','rgba(120,250,120,0.5)'],
              //   hoverBackgroundColor:"#169abb",
                  
              //     hoverBorderColor:"#169abb"
              //   }];  


              self.topLogoType = 'bar';
              self.topLogoData = [{ data: [65, 59, 80, 81, 56, 55, 40], label: 'Top Logo`s'}];
              self.topLogoLabels = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];


              self.topAreaType = 'bar';
              self.topAreaData = [{ data: [65, 59, 80, 81, 56, 55, 40, 81, 56, 55,34,34,22,57,89,65,24,23], label: 'Top 1'},{ data: [65, 59, 80, 81, 56, 55, 40, 81, 56, 55,45,33,56,89,12,22,1], label: 'Top 2'},{ data: [6, 9, 8, 1, 5, 5, 4,3,4,5,2,6,7,8,9,9,6,4,5], label: 'Top 3'}];
              self.topAreaLabels = ['10', '20', '30', '40', '50', '60', '70','80', '90', '100', '110', '120', '130'];
              self.topAreaColor = [{
              backgroundColor:['#0073B7','#2BC6FF', '#CAD62C', '#E05C6B', '#FF8787','rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)', 'rgba(75, 192, 192, 1)', 'rgba(153, 102, 255, 1)', 'rgba(255, 159, 64, 1)','rgba(0,10,220,1)','rgba(220,90,10,0.6)','rgba(220,100,40,1)','rgba(120,250,120,0.5)','rgba(255, 206, 86, 0.2)', 'rgba(75, 192, 192, 0.2)','rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)', 'rgba(75, 192, 192, 1)', 'rgba(153, 102, 255, 1)', 'rgba(255, 159, 64, 1)','rgba(0,10,220,1)','rgba(220,0,10,1)','rgba(220,0,0,1)','rgba(120,250,120,0.5)','rgba(255, 206, 86, 0.2)', 'rgba(75, 192, 192, 0.2)','#CAD62C', '#E05C6B', '#FF8787'],
               hoverBackgroundColor:"rgba(75, 192, 192, 1)",
                 
                  hoverBorderColor:"#421006"
                },
                {
              backgroundColor:['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)', 'rgba(75, 192, 192, 1)', 'rgba(153, 102, 255, 1)', 'rgba(255, 159, 64, 1)','rgba(0,10,220,1)','rgba(220,30,10,0.6)','rgba(220,50,0,0.7)','rgba(120,250,120,0.5)','rgba(255, 206, 86, 0.2)', 'rgba(75, 192, 192, 0.2)','rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)','#0073B7','#2BC6FF', '#CAD62C', '#E05C6B', '#FF8787', 'rgba(75, 192, 192, 1)', 'rgba(153, 102, 255, 1)', 'rgba(255, 159, 64, 1)','rgba(0,10,220,1)','rgba(220,0,10,1)','rgba(220,0,0,1)','rgba(120,250,120,0.5)','rgba(255, 206, 86, 0.2)', 'rgba(75, 192, 192, 0.2)','#CAD62C', '#E05C6B', '#FF8787'],
                  hoverBackgroundColor:"rgba(175, 192, 192, 1)",
                 
                  hoverBorderColor:"#421006"
                },
                    {
              backgroundColor:['rgba(75, 192, 192, 1)', 'rgba(153, 102, 255, 1)', 'rgba(255, 159, 64, 1)','rgba(0,10,220,1)','rgba(220,30,10,0.6)','rgba(220,50,0,0.7)','rgba(120,250,120,0.5)','rgba(255, 206, 86, 0.2)', 'rgba(75, 192, 192, 0.2)','rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)','#0073B7','#2BC6FF', '#CAD62C', '#E05C6B', '#FF8787', 'rgba(75, 192, 192, 1)', 'rgba(153, 102, 255, 1)', 'rgba(255, 159, 64, 1)','rgba(0,10,220,1)','rgba(220,0,10,1)','rgba(220,0,0,1)','rgba(120,250,120,0.5)','rgba(255, 206, 86, 0.2)', 'rgba(75, 192, 192, 0.2)','#CAD62C', '#E05C6B', '#FF8787'],
                  hoverBackgroundColor:"rgba(75, 19, 192, 1)",
                 
                  hoverBorderColor:"#421006"
                }
                ];



            self.contiChartType = 'radar';    
            self.contilabel = ["> 10", "9", "8", "7 ", "6","5", "4", "3", "2 ", "1 >"];
            self.contiChartColor = [{backgroundColor: ["rgba(75, 192, 192, 1)"],  borderColor: "rgba(179,181,198,1)", pointBackgroundColor: "rgba(54, 162, 235, 1)", pointBorderColor: "#fff",
            pointHoverBackgroundColor: "#fff",
            pointHoverBorderColor: "rgba(179,181,198,1)" }]
            self.contiData =  [ {label: "My First dataset", data: [0, 1, 0, 0, 2, 3, 11, 12, 71, 30] }];


              self.brands_exposure = "00:00:00";

              var match_list = [{name: 'SYS Vs WBD',match: 'SYS vs WBD'}]
              self.dropDownMatch = match_list
              self.selected_match = self.dropDownMatch[0].match;

              var league_list = [{name: 'AFL',league: 'AFL' },{name: 'PKL',league: 'PKL' }]
              self.dropDownLeague = league_list
              self.selected_league = self.dropDownLeague[0].league;

              var interval_list = [{name:'30 Secs', value:'30s'},{name:'2 Mins', value:'2m'},{name:'5 Mins', value:'5m'},{name:'10 Mins', value:'10m'}]
              self.dropDownInterval = interval_list
              self.selected_interval = self.dropDownInterval[3].value;
              self.type = "afl_output_2016";
              
              var data1 = this.localStorageService.get('type');
              var data2 = this.localStorageService.get('match');
              var data3 = this.localStorageService.get('interval');
              var data4 = this.localStorageService.get('logo');
              
              var type = data1;
              self.selected_match= data2;
              self.selected_interval = data3;
              self.selected_brand = data4;
              
           //   self.requestBrandExposure({match:self.selected_match,type:self.type,interval:self.selected_interval},self);
              self.requestLogoExposure({match:self.selected_match,type:self.type,interval:self.selected_interval,logo:self.selected_brand},self);
              console.log('brandwise',this.localStorageService.get('type')); 
              console.log(this.localStorageService.get('match')); 
              console.log(this.localStorageService.get('interval')); 
              console.log(self.selected_brand); 



              var logo_category_list = [{name:'Top 10', value:'top_10'},{name:'Bottom 10', value:'bottom_10'},{name:'All', value:'all'}]
              self.dropDownlogocategory = logo_category_list
              self.selected_category = self.dropDownlogocategory[0].value;

              var match_section_list = [{name:'Full', value:'full'},{name:'1st Half', value:'first_half'},{name:'2nd Half', value:'second_half'}]
              self.dropDownMatchSection = match_section_list;
              self.selected_section = self.dropDownMatchSection[0].value;
        
              
}


//   jQuery("#col1").jQCloud(self.words,{
//                       autoResize: true
//                });

// if (window.screen.width < 1000){
// document.location = "mobile-resposive.html";
// }


  goHome() {
   
    this.router.navigate(['/pages/dashboard']);
    //brand-form
  }






requestBrandExposure(post_data,self){
self._httpService.PostHttp(JSON.stringify(post_data),"brand_exposure")
            .subscribe(
            (data2) => {
             self.getExposure(data2,self);
          //   self.requestLogoExposure()
  //          self.processMaplytiksData(data2,self);
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
  
 // self.requestBrandExposure({match:self.selected_match,type:self.type,interval:self.selected_interval},self);
}

OnChangeInterval(){
  let self = this 
  var selected = self.selected_interval;
  self.requestLogoExposure({match:self.selected_match,type:self.type,interval:self.selected_interval,logo:self.selected_brand},self);
  
}



// topLogos(){
//   let self = this;
//   if(self.selected_category ==='top_10' ){
//       self.topLogoData = [{ data:  self.getTopTenChartValue(self.allData), label: 'Top Logos'}];
//       self.topLogoLabels = self.getTopTenChartLabel(self.allLogoLabels)

//   }

//  if(self.selected_category ==='bottom_10' ){
//    self.topLogoData = [{ data:  self.getLastTenChartValue(self.allData), label: 'Top Logos'}];
//   self.topLogoLabels = self.getLastTenChartLabel(self.allLogoLabels)

//   }

//   if(self.selected_category ==='all' ){
//     self.topLogoData = [{ data:  self.allData, label: 'Top Logos'}];
//    self.topLogoLabels = self.allLogoLabels;
//   }
 
// }


matchIntervals(){
  let self = this;

 if(self.selected_section ==='full' ){
          self.fullInterval(self)
  }
 if(self.selected_section ==='first_half' ){
        self.firstHalfInterval(self);
  }
  if(self.selected_section ==='second_half' ){
    self.secondHalfInterval(self)  
    }
  console.log(self.selected_section);
}









// requestAssetExposure(post_data,self){
// self._httpService.PostHttp(JSON.stringify(post_data),"asset_exposure")
//             .subscribe(
//               (data2) => {
//                  self.processMaplytiksData(data2,self);
//               },
//               (error) => {
//                 console.log(error);
//               }
//             );
// }

// requestElementExposure(post_data,self){
// self._httpService.PostHttp(JSON.stringify(post_data),"element_exposure")
//             .subscribe(
//               (data2) => {
//                  self.processMaplytiksData(data2,self);
//               },
//               (error) => {
//                 console.log(error);
//               }
//             );
// }

requestLogoExposure(post_data,self){
self._httpService.PostHttp(JSON.stringify(post_data),"logo_exposure")
            .subscribe(
              (data2) => {
                 self.processMaplytiksData(data2,self);
                
              },
              (error) => {
                console.log(error);
              }
            );
}

// requestAssetAndLogoExposure(post_data,self){
// self._httpService.PostHttp(JSON.stringify(post_data),"asset_logo_exposure")
//             .subscribe(
//               (data2) => {
//                  self.processMaplytiksData(data2,self);
//               },
//               (error) => {
//                 console.log(error);
//               }
//             );
// }

// requestLogoAndElementExposure(post_data,self){
//   self._httpService.PostHttp(JSON.stringify(post_data),"logo_element_exposure")
//             .subscribe(
//               (data2) => {
//                  self.processMaplytiksData(data2,self);
//               },
//               (error) => {
//                 console.log(error);
//               }
//             );

// }


// requestAssetAndElementExposure(post_data,self){
//   self._httpService.PostHttp(JSON.stringify(post_data),"asset_element_exposure")
//             .subscribe(
//               (data2) => {
//                  self.processMaplytiksData(data2,self);
//               },
//               (error) => {
//                 console.log(error);
//               }
//             );

// }


// requestAssetAndLogoAndElement(post_data,self){
//   self._httpService.PostHttp(JSON.stringify(post_data),"asset_logo__elements_exposure")
//             .subscribe(
//               (data2) => {
//                  self.processMaplytiksData(data2,self);
//               },
//               (error) => {
//                 console.log(error);
//               }
//             );

// }




fullInterval(self){
      self.lineChartData = self.allLineChartData
      self.lineChartLabels =self.allLineChartLabels;
}


firstHalfInterval(self){
    var chartData = self.getFirstHalfTimeValue(self.allLineChartData)
    var chartLabels = self.getFirstHalfTimeLabel(self.allLineChartLabels)
    self.lineChartData = chartData
    self.lineChartLabels =chartLabels;
}


secondHalfInterval(self){

    var chartData = self.getSecondHalfTimeValue(self.allLineChartData)
    var chartLabels = self.getSecondHalfTimeLabel(self.allLineChartLabels)
    self.lineChartData = chartData
    self.lineChartLabels =chartLabels;
    
}

// getExposure(data,self){
//             // self.brands_exposure = data.brands_exposure;
//             // self.totalExposureTime = data.tot_brand_exposure;
  
//             self.brand_exposure_frame = data.brands_exposure_count;
//             self.totalFrameCount = data.frameCount;
//             self.totalbrandexposureCount = data.brands_exposure_count;

//             console.log('overall frame', self.totalFrameCount);
//             console.log('overall brand frame' ,self.brand_exposure_frame );
//           // self.logoExposure(data)
//            // self.percentageBrandExposure = ((self.totalbrandexposureCount/  self.totalFrameCount)*100).toFixed(2);
//             // self.topAssetWiseData = [{data: self.getDiffAssetChartValue(data.asset,data.frameCount) , label: 'Top Types'}];
//             // self.topAssetWiseLabels = self.getChartLabel(data.asset);
//             // self.logo_type_val = [ {data: self.getChartTypeValue(data.logos_in_type), label: 'Asset Type'}];
//             // self.logo_type_Lab = self.getChartLabel(data.logos_in_type);
//   //           self.totalBrandsNumber = data.logoNames.length;
//        //       console.log(self.logo_type_val);
//           //     console.log(self.logo_type_Lab);
// }



processMaplytiksData(data,self){
           self.brand_exposure_frame = data.brands_exposure_count;
           self.brand_exposure = data.brands_exposure;
           self.area = data.avg_area;
           self.area1 = ((self.area/2073600)*100).toFixed(2);
       
        //   self.getareaanimation(self.area1);
           console.log('one brand frame', self.brand_exposure_frame);
            console.log('one brand time', self.brand_exposure);
            var numb = self.getanimation(self.brand_exposure_frame);
          //   self.brand_exposure = data.brand_exposure;
          //   console.log(self.brand_exposure);
             self.topAssetData = [{data: self.getChartTimeValue(data.asset), label: 'top types'}];
             self.topAssetLabels = self.getChartLabel(data.asset);

             self.assetFrameData = [{data: self.getChartValue(data.asset), label: 'top assets frames'}];
             self.assetFrameLabels = self.getChartLabel(data.asset);

             console.log(JSON.stringify(self.assetFrameData));
             console.log(self.assetFrameLabels);
             self.logoName =  self.selected_brand;


             self.areaAssetData = [{data: self.getAreaValue(data.logo_area_on_assest), label: 'top types'}];  
            self.areaAssetLabels = self.getAreaLabel(data.logo_area_on_assest);
            

            self.contiData = self.getContinuousValue(data.continuous);
             self.contilabel = self.getContinuousLabel(data.continuous);
             console.log('contilab', self.contilabel  );
            console.log('conti', JSON.stringify(self.contiData));

         

           self.allLineChartData = self.getTimeValue(data.time);
           self.allLineChartLabels = self.getTimeLabel(data.time);
           self.lineChartData = self.allLineChartData
           self.lineChartLabels =self.allLineChartLabels;
           self.matchIntervals()
             console.log('line', JSON.stringify(self.lineChartData));

}




getanimation(data){
  var numb = data;
      var currentNumber = jQuery('#dynamic-number').text();

              jQuery({numberValue: currentNumber}).animate({numberValue: numb }, {
                  duration: 3000,
                  easing: 'linear',
                  step: function () { 
                      jQuery('#dynamic-number').text(Math.ceil(this.numberValue)); 
                  },
                  done: function () {
                      jQuery('#dynamic-number').text(Math.ceil(this.numberValue));
                  }
              });
            
}


// getareaanimation(data){
//   var numb = data;
//       var currentNumber = jQuery('#dynamic-area').text();

//               jQuery({numberValue: currentNumber}).animate({numberValue: numb }, {
//                   duration: 3000,
//                   easing: 'linear',
//                   step: function () { 
//                       jQuery('#dynamic-area').text(Math.ceil(this.numberValue)); 
//                   },
//                   done: function () {
//                       jQuery('#dynamic-area').text(Math.ceil(this.numberValue));
//                   }
//               });
            
// }





getChartLabel(data){
 var data = data;   
 var label = [];
        for (var i = 0; i < data.length; i++) {
            var obj = data[i];
            label.push(obj.key);
        }
        return label;
}


// getChartTypeLabel(data){
//  var data = data;   
//  var label = [];
//         for (var i = 0; i < data.length; i++) {
//             var obj = data[i];
//             label.push(obj.key);
//         }
//         return label;
// }

// getChartTypeValue(data){
//  var data = data;   
//  var label = [];
//    for (var i = 0; i < data.length; i++) {
//             var obj = data[i];
//             label.push(obj.logos.buckets.length);
//         }
//         return label;
// }



getFirstHalfTimeLabel(data){
 var data = data;
 var length = Math.round(data.length/2);
  console.log(JSON.stringify(length));
 var label = [];
        for (var i = 0; i < length; i++) {
             label.push(data[i]);
          }
 //          console.log(JSON.stringify(label));
        return label;

}





getFirstHalfTimeValue(data){
  var data = data; 
var chart_data = [];
var color =  ['#3b5998','#e9573f','#f6bb42', '#00b1e1', '#37bc9b', '#8cc152','#db4b3a'];
    for (var i = 0; i < data.length; i++) {
          var d = data[i].data;
          var lab = data[i].label;
          var data_box= [];
            for(var j=0; j< (d.length/2); j++){
                data_box.push(d[j]);
            }
             chart_data.push({data:data_box,label:data[i].label, fill: false, borderColor: color[i], lineTension: 0.1, backgroundColor: color[i], borderCapStyle: 'butt', borderDash: [], borderDashOffset: 0.0, borderJoinStyle: 'miter', pointBorderColor: color[i], pointBackgroundColor: color[i], pointBorderWidth: 1,borderWidth: 1,  pointHoverRadius: 5, pointHoverBackgroundColor: color[i], pointHoverBorderColor: color[i], pointHoverBorderWidth: 2, pointRadius: 2, pointHitRadius: 10 })
       
  
}

  return chart_data;

}








getSecondHalfTimeLabel(data){
 var data = data;
 var length = Math.floor(data.length/2);
 var label = [];
        for (var i = length; i < data.length; i++) {
             label.push(data[i]);
          }
 
        return label;
}



getSecondHalfTimeValue(data){
  var data = data; 
var chart_data = [];
var color =  ['#3b5998','#e9573f','#f6bb42', '#00b1e1', '#37bc9b', '#8cc152','#db4b3a'];
    for (var i = 0; i < data.length; i++) {
          var d = data[i].data;
          var l = Math.floor(d.length/2)
          var data_box= [];
            for(var j = l; j <= (d.length); j++){
                data_box.push(d[j]);
            }
             chart_data.push({data:data_box,label:data[i].label, fill: false, borderColor: color[i], lineTension: 0.1, backgroundColor: color[i], borderCapStyle: 'butt', borderDash: [], borderDashOffset: 0.0, borderJoinStyle: 'miter', pointBorderColor: color[i], pointBackgroundColor: color[i], pointBorderWidth: 1, borderWidth: 1, pointHoverRadius: 5, pointHoverBackgroundColor: color[i], pointHoverBorderColor: color[i], pointHoverBorderWidth: 2, pointRadius: 2, pointHitRadius: 10 })
       
  
}

  return chart_data;

}



// getAreaValue(data){
//  var data = data;   
//  var value = [];
//         for (var i = 0; i < data.length; i++) {
//             var v1 = data[i].logos.buckets.area.value;
//             var v2 = v1.length;
//             // var v1 = obj.area.value;
//              console.log('v1', v2);
//           //    var v2 = obj.doc_count;
//          //    var v3 = (((v1/v2)/2073600)*100).toFixed(2);
//                 value.push(v2);
//         }
//         return value;
// }


getAreaValue(data){
var data = data; 
var chart_data = [];
var color =  ['#3b5998','#e9573f','#f6bb42', '#00b1e1', '#37bc9b', '#8cc152','#db4b3a'];
     for (var i = 0; i < data.length; i++) {
          var d = data[i].logos.buckets;
          var data_box= [];
            for(var j=0;j<d.length;j++){
              var v1 = d[j].area.value;
              var v2 = d[j].doc_count;
             var v3 = (((v1/v2)/2073600)*100).toFixed(2);
                chart_data.push(v3);
            }
            //  chart_data.push({data:data_box,label:data[i].key, fill: false, borderColor: color[i], lineTension: 0.1, backgroundColor: color[i], borderCapStyle: 'butt', borderDash: [], borderDashOffset: 0.0, borderJoinStyle: 'miter', pointBorderColor: color[i], pointBackgroundColor: color[i], borderWidth: 1, pointBorderWidth: 0.5, pointHoverRadius: 5, pointHoverBackgroundColor: color[i], pointHoverBorderColor: color[i], pointHoverBorderWidth: 1, pointRadius: 2, pointHitRadius: 10 })
           //  chart_data.push({data:data_box});
}
    
 return chart_data;
}




getAreaLabel(data){
  var data = data;
  var chart_data = [];
    var d = data;
          
           for(var j=0;j<d.length;j++){
            var lab =d[j].key;
            var res = lab;
                chart_data.push(res);
          }
    return chart_data 
}

getContinuousLabel(data){
  var data = data;
  var label = ["> 10", "9", "8", "7 ", "6","5", "4", "3", "2 ", "1 >"]
  var chart_data = [];
    var lab = data[i];
  for (var i = 0; i < data.length; i++) {
      
          var a;
         if ( a = lab.sum_10){
                chart_data.push(label[0]);
         }
          if ( a = lab.sum_9){
                chart_data.push(label[1]);
         }
          if ( a = lab.sum_8){
                chart_data.push(label[2]);
         }
            if ( a = lab.sum_7){
                chart_data.push(label[3]);
         }
          if ( a = lab.sum_6){
                chart_data.push(label[4]);
         }
          if ( a = lab.sum_5){
                chart_data.push(label[5]);
         }
            if ( a = lab.sum_4){
                chart_data.push(label[6]);
         }
          if ( a = lab.sum_3){
                chart_data.push(label[7]);
         }
          if ( a = lab.sum_2){
                chart_data.push(label[8]);
         }
           if ( a = lab.sum_1){
                chart_data.push(label[9]);
         }
  }
          
    return chart_data 
}


getContinuousValue(data){
var data = data; 
var chart_data = [];
var color =  ['#3b5998','#e9573f','#f6bb42', '#00b1e1', '#37bc9b', '#8cc152','#db4b3a'];

     for (var i = 0; i < data.length; i++) {
          var d = data[i].key;
          var f = data[i]
          var data_box = [];       
      
            var d10 = f.sum_10.value;
            var d9 = f.sum_9.value;
            var d8 = f.sum_8.value;
              var d7 = f.sum_7.value;
            var d6 = f.sum_6.value;
            var d5 = f.sum_5.value;
              var d4 = f.sum_4.value;
            var d3 = f.sum_3.value;
            var d2 = f.sum_2.value;
             var d1 = f.sum_1.value;
              var d0 = f.sum_0.value;
            data_box.push(d10, d9, d8, d7, d6, d5, d4, d3, d2, d1, d0);
          chart_data.push({data: data_box, label : d});  
      
}


 return chart_data;
}





getTimeValue(data){
var data = data; 
var chart_data = [];
var color =  ['#3b5998','#e9573f','#f6bb42', '#00b1e1', '#37bc9b', '#8cc152','#db4b3a'];
     for (var i = 0; i < data.length; i++) {
          var d = data[i].time_interval.buckets;
          var data_box= [];
            data_box.push(0);
            for(var j=0;j<d.length;j++){
              var minutesvalue = (d[j].unique_count.value/25).toFixed(2);
               
                data_box.push(minutesvalue);
            }
             chart_data.push({data:data_box,label:data[i].key, fill: false, borderColor: color[i], lineTension: 0.1, backgroundColor: color[i], borderCapStyle: 'butt', borderDash: [], borderDashOffset: 0.0, borderJoinStyle: 'miter', pointBorderColor: color[i], pointBackgroundColor: color[i], borderWidth: 1, pointBorderWidth: 0.5, pointHoverRadius: 5, pointHoverBackgroundColor: color[i], pointHoverBorderColor: color[i], pointHoverBorderWidth: 1, pointRadius: 2, pointHitRadius: 10 })
 
}
    
 return chart_data;
}




getTimeLabel(data){
  var data = data;
  var chart_data = [];
    var d = data[0].time_interval.buckets;
          
           for(var j=0;j<d.length;j++){
            var lab =d[j].key_as_string;
            var res = lab.substring(11, 19);
                chart_data.push(res);
          }
    //  for (var i = 0; i < data.length; i++) {
    //       var d = data[i].time_interval.buckets;
          
    //        for(var j=0;j<d.length;j++){
    //      //     var res = lab.substring(11, 19);
    //             chart_data.push(d[j].key_as_string);
    //       }
    // }
    return chart_data 
}





// getTopTenChartLabel(data){
//  var data = data;   
//   var count =0;
//   if(data.length<=10){
    
//     count =data.length;
//   }else{
//     count = 10;
//   }
//  var label = [];
//         for (var i = 0; i < count; i++) {
//             label.push(data[i]);
//         }
//         return label;

// }


// getTopTenChartValue(data){
//   var data = data;   
//   var count =0;
//   if(data.length<=10){
    
//     count =data.length;
//   }else{
//     count = 10;
//   }
 
//  var label = [];
//         for (var i = 0; i < count; i++) {
//             label.push(data[i]);
//         }
//         return label;
// }


// getLastTenChartLabel(data){
//  var data = data;
//  var k = data.length;   
//  var label = [];
//         for (var i = 0; i < 10; i++) {
//             k = k-1;
//             label.push(data[k]);
//         }
//         return label;

// }

// getLastTenChartValue(data){
//   var data = data;   
//   var k = data.length;   
//  var label = [];
//         for (var i = 0; i < 10; i++) {
//             k = k-1;
//             label.push(data[k]);
//         }
//         return label;
// }


getChartTimeValue(data){
 var data = data;   
 var value = [];
        for (var i = 0; i < data.length; i++) {
            var obj = data[i];
            var minutesdata = (obj.unique_count.value/1500).toFixed(2);
            value.push(minutesdata);
           // value.push(obj.unique_count.value);
        }
        return value;
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
// getDiffAssetChartValue(data,totalframe){


//    var data = data;   
//  var value = [];
//         for (var i = 0; i < data.length; i++) {
//             var obj = data[i];
//            // var diff_val =  (obj.doc_count/totalframe)*100;
//             //console.log(diff_val.toFixed(2));
//             var minutesdata = (obj.unique_count.value/1500);
//             value.push(minutesdata);
            
//         }
//         return value;
// }


//  public makeRequest(self){

// //  if(self.asset_data!=="" && self.logo_data!=="" && self.logo_ele!=="" ){
// //     self.requestAssetAndLogoAndElement({"asset":self.asset_data,"logo":self.selected_brand,logo_element:self.logo_ele,match:self.selected_match,type:self.type,interval:self.selected_interval},self);
  
// //   }
// //   else if(self.asset_data!=="" && self.logo_data!==""){
// //     self.requestAssetAndLogoExposure({"asset":self.asset_data,"logo":self.selected_brand,match:self.selected_match,type:self.type,interval:self.selected_interval},self);
// //     self.logo_ele ==="";
// //   }else if(self.logo_data!=="" && self.logo_ele!=="") {
// //    self.requestLogoAndElementExposure({"logo":self.selected_brand,"logo_element":self.logo_data,match:self.selected_match,type:self.type,interval:self.selected_interval},self);
// //    self.asset_data==="";
// //   }else if(self.asset_data!=="" && self.logo_ele!==""){
// //     self.requestAssetAndElementExposure({"asset":self.asset_data,"logo_element":self.logo_ele,match:self.selected_match,type:self.type,interval:self.selected_interval},self);
// //     self.logo_data==="";
// //   }
//  if(self.logo_data!==""){
//     self.requestLogoExposure({"logo":self.selected_brand,match:self.selected_match,type:self.type,interval:self.selected_interval},self);
//     self.asset_data===""; self.logo_ele ==="";
//   }
// //else if(self.logo_ele!==""){
// //     self.requestElementExposure({"logo_element":self.logo_ele,match:self.selected_match,type:self.type,interval:self.selected_interval},self);
// //     self.asset_data===""; self.logo_data==="";
// //   }else if(self.asset_data!==""){
// //     self.requestAssetExposure({"asset":self.asset_data,match:self.selected_match,type:self.type,interval:self.selected_interval},self);
// //      self.logo_data==="";self.logo_ele ==="";
// //   }else{
// //     self.requestBrandExposure({match:self.selected_match,type:self.type,interval:self.selected_interval},self);
// //     self.asset_data===""; self.logo_data==="";self.logo_ele ==="";
// //   }

// }



  // events
  // public assetExposureClicked(e:any):void {
  //   let self = this;
    
  //   //console.log(self.topAssetLabels[e.active[0]._index]);
  //   self.asset_data = self.topAssetLabels[e.active[0]._index];
  //   self.makeRequest(self);
  // }

  // public logoExposure(data){
  //   let self = this;
  //   self.logo_data = data;
  //   self.makeRequest(self);
  // }
   
  public getBackHome(){
      let self = this;
      self.asset_data ="";
      self.logo_ele="";
      self.logo_data="";
      self.selected_league = self.dropDownLeague[0].league;
   //   self.requestBrandExposure({match:"SYS vs WBD",type:"afl_output_2016",interval:"10m"},self);
      //self.topTenLogo();
    
  }

  public chartHovered(e:any):void {
    //console.log(e);
  }

  public chartClicked(e:any):void{
    //console.log(e);
  }

 public topAssetOptions:any = {
    scaleShowVerticalLines: false,
    responsive: true,
     layout: {
       padding: top
   },
        title: {
     display: true,
     position: 'top',
     text: "Brand visibility breakup per asset",
          fontFamily: "Noto Sans",
     fontSize: 14,
     padding: 20,
     fontColor: "#E87868",
     fullWidth: true
   },     scales: {
   yAxes: [{
     scaleLabel: {
       display: true,
       labelString: 'Assets',
       fontSize: 18,
         fontFamily: "Noto Sans"
         
        //fontColor: 'red'
     },
     ticks: {
               fontSize: 13,
               showLabelBackdrop    : true,
               fontFamily: "Verdana",
               //fontColor: 'red'
               backdropPaddingY: 25,
               backdropPaddingX: 59
           }              
   }],
   xAxes: [{
     scaleLabel: {
       display: true,
       labelString: 'Duration (minutes)',
       fontSize: 18,
         fontFamily: "Noto Sans"
       //fontColor: 'green'
     },
      ticks: {
               fontSize: 13,
             fontFamily: " Helvetica Neue",
             beginAtZero: true
               //fontColor: 'red'        
           }
   }]
 },
           tooltips: {
            callbacks: {
                  label: function(tooltipItem, data) {
                          var allData = data.datasets[tooltipItem.datasetIndex].data;
                    var tooltipLabel = data.labels[tooltipItem.index];
                    var tooltipData = allData[tooltipItem.index];
                    var secs = tooltipData*60;
       
         var hours   = Math.floor(secs / 3600);
  var minutes = Math.floor((secs - (hours * 3600)) / 60);
  var seconds = secs - (hours * 3600) - (minutes * 60);

  // round seconds
  seconds = Math.round(seconds * 100) / 100
  var seconds1 = seconds.toFixed(0);

  var result = (hours < 10 ? "0" + hours : hours);
      result += ":" + (minutes < 10 ? "0" + minutes : minutes);
      result += ":" + (seconds  < 10 ? "0" + seconds1 : seconds1);
  return  'Duration: ' + result;
  
    
}

//                   ylabel: function(tooltipItem, data) {
//                           var allData = data.datasets[tooltipItem.datasetIndex].data;
//                     var tooltipLabel = data.labels[tooltipItem.index];
//                     var tooltipData = allData[tooltipItem.index];
                  
//   return  'Asset: ' + tooltipData;
  
    
// }
    }
            },
  legend: {
  position: 'bottom',
     display: true,
            labels: {
                fontSize: 12,
                 fontFamily: "Noto Sans",
                 padding: 18
            }

}

 };
 

public lineChartOptions:any =
{
   scaleShowVerticalLines: false,
   responsive: true,
   layout: {
       padding: top
   },
   title: {
     display: true,
     padding: 15,
     text: "Time Analysis based on the asset type selection (Overall by default)",
     fontFamily: "Noto Sans",
     fontSize: 14,
     fontColor: "#E87868"
   },
 scales: {
   yAxes: [{
     scaleLabel: {
       display: true,
       labelString: 'Duration (Secs)',
       fontSize: 18,
       fontFamily: "Noto Sans"
        //fontColor: 'red'
     },
     ticks: {
               fontSize: 13,
               showLabelBackdrop    : true,
               fontFamily: "Noto Sans",
               //fontColor: 'red'
               backdropPaddingY: 25,
               backdropPaddingX: 59,
                beginAtZero: true
           }              
   }],
   xAxes: [{
     scaleLabel: {
       display: true,
       labelString: 'Time',
       fontSize: 18,
         fontFamily: "Noto Sans"
       //fontColor: 'green'
     },
      ticks: {
               fontSize: 13,
             fontFamily: " Helvetica Neue",
               //fontColor: 'red'   
               beginAtZero: true     
           }
   }]
 },         
 tooltips: {
            callbacks: {
                  label: function(tooltipItem, data) {
                          var allData = data.datasets[tooltipItem.datasetIndex].data;
                    var tooltipLabel = data.labels[tooltipItem.index];
                    var tooltipData = allData[tooltipItem.index];
                    
  return  'Duration: ' + tooltipData  +  ' (secs)';
  
    
}
    }
            },
legend: {
  display: true,
  position: 'bottom'
}
};





 public areaAssetOptions:any = {
    scaleShowVerticalLines: false,
    responsive: true,
     layout: {
       padding: top
   },
        title: {
     display: true,
     position: 'top',
     text: "Average Area breakup per asset",
          fontFamily: "Noto Sans",
     fontSize: 14,
     padding: 20,
     fontColor: "#E87868",
     fullWidth: true
   },     scales: {
   yAxes: [{
     scaleLabel: {
       display: true,
       labelString: 'Percentage',
       fontSize: 18,
         fontFamily: "Noto Sans"
         
        //fontColor: 'red'
     },
     ticks: {
               fontSize: 13,
               showLabelBackdrop    : true,
               fontFamily: "Verdana",
               //fontColor: 'red'
                 beginAtZero: true,
               backdropPaddingY: 25,
               backdropPaddingX: 59
           }              
   }],
   xAxes: [{
     scaleLabel: {
       display: true,
       labelString: 'Assets',
       fontSize: 18,
         fontFamily: "Noto Sans"
       //fontColor: 'green'
     },
      ticks: {
               fontSize: 13,
             fontFamily: " Helvetica Neue",
           
               //fontColor: 'red'        
           }
   }]
 },
           tooltips: {
            callbacks: {
                  label: function(tooltipItem, data) {
                          var allData = data.datasets[tooltipItem.datasetIndex].data;
                    var tooltipLabel = data.labels[tooltipItem.index];
                    var tooltipData = allData[tooltipItem.index];
                    
  return  'Percentage: ' + tooltipData + '%';
  
    
}
    }
            },
  legend: {
  position: 'bottom',
     display: true,
            labels: {
                fontSize: 12,
                 fontFamily: "Noto Sans",
                 padding: 18
            }

}

 };
//  public topAssetWiseOptions:any = {
//     scaleShowVerticalLines: false,
//     animation : false,
//     responsive: true,
//            tooltips: {
//             callbacks: {
//                   label: function(tooltipItem, data) {
//                           var allData = data.datasets[tooltipItem.datasetIndex].data;
//                    // var tooltipLabel = data.labels[tooltipItem.index];
//                     var tooltipData = allData[tooltipItem.index];
//                     var secs = tooltipData*60;
       
//          var hours   = Math.floor(secs / 3600);
//   var minutes = Math.floor((secs - (hours * 3600)) / 60);
//   var seconds = secs - (hours * 3600) - (minutes * 60);

//   // round seconds
//   seconds = Math.round(seconds * 100) / 100
//   var seconds1 = seconds.toFixed(0);

//   var result = (hours < 10 ? "0" + hours : hours);
//       result += ":" + (minutes < 10 ? "0" + minutes : minutes);
//       result += ":" + (seconds  < 10 ? "0" + seconds1 : seconds1);
//   return 'Duration: ' + result;
  
    
// }
//     }
//             },

//        layout: {
//        padding: top
//    },
//         title: {
//      display: true,
//      position: 'top',
//      text: "% Brand visibility by Asset Type",
//      fontSize: 14,
//      fontFamily: "Noto Sans",
//      padding: 15,
//      fontColor: "#E87868",
//      fullWidth: true
//    },
//    scales: {
//    yAxes: [{
//      scaleLabel: {
//        display: true,
//        labelString: 'Duration (minutes)',
//        fontSize: 18,
//          fontFamily: "Noto Sans"
//         //fontColor: 'red'
//      },
//      ticks: {
//                fontSize: 13,
//                showLabelBackdrop    : true,
//                fontFamily: "Noto Sans",
//                //fontColor: 'red'
//                backdropPaddingY: 25,
//                backdropPaddingX: 59
//            }              
//    }],
//    xAxes: [{
//      scaleLabel: {
//        display: true,
//        labelString: 'Assets',
//        fontSize: 18,
//          fontFamily: "Noto Sans"
//        //fontColor: 'green'
//      },
//       ticks: {
//                fontSize: 13,
//              fontFamily: " Noto Sans"
//                //fontColor: 'red'        
//            }
//    }]
//  },
//    legend:{
//        display: true,
//       position: 'bottom'
//    }

//  };
     


//     public barChartOptions:any = {
//     scaleShowVerticalLines: false,
//     animation : false,
//     responsive: true,
//            layout: {
//        padding: top
//    },
 
//     title: {
//      display: true,
//      padding: 15,
//      text: "Number of Brands per Asset",
//      fontFamily: "Noto Sans",
//      fontSize: 14,
//      fontColor: "#E87868"
//    },
//      scales: {
//    yAxes: [{
//      scaleLabel: {
//        display: true,
//        labelString: 'Assets',
//        fontSize: 18,
//          fontFamily: "Noto Sans"
         
//         //fontColor: 'red'
//      },
//      ticks: {
//                fontSize: 13,
//                showLabelBackdrop    : true,
//                fontFamily: "Verdana",
//                //fontColor: 'red'
//                backdropPaddingY: 25,
//                backdropPaddingX: 59
//            }              
//    }],
//    xAxes: [{
//      scaleLabel: {
//        display: true,
//        labelString: 'Number of Brands',
//        fontSize: 18,
//          fontFamily: "Noto Sans"
//        //fontColor: 'green'
//      },
//       ticks: {
//                fontSize: 13,
//              fontFamily: " Helvetica Neue"
//                //fontColor: 'red'        
//            }
//    }]
//  },
//   };




public assetFrameChartOptions:any = {
      scaleShowVerticalLines: false,
    responsive: true,
     layout: {
       padding: top
   },
        title: {
     display: true,
     position: 'top',
     text: "Number of times Brand was seen per asset",
          fontFamily: "Noto Sans",
     fontSize: 14,
     padding: 20,
     fontColor: "#E87868",
     fullWidth: true
   },
          tooltips: {
            callbacks: {
                label: function (tooltipItem, data) {
                    var allData = data.datasets[tooltipItem.datasetIndex].data;
                    var tooltipLabel = data.labels[tooltipItem.index];
                    var tooltipData = allData[tooltipItem.index];
                    var total = 0;
                    for (var i in allData) {
                        total += allData[i];
                    }
                    var tooltipPercentage = Math.round((tooltipData / total) * 100);
                    return tooltipLabel + ': ' + tooltipData + ' (' + tooltipPercentage + '%)';
                }
            }
        },
  legend: {
  position: 'bottom',
     display: true,
            labels: {
                fontSize: 12,
                 fontFamily: "Noto Sans",
                 padding: 18
            }

}
};




// public topAreaOptions:any = {
//    scaleShowVerticalLines: false,
//    responsive: true,
//    layout: {
//        padding: 55
//    },
//    title: {
//      display: true,
//      padding: 15,
//      text: "Area Vs Time",
//      fontFamily: "Noto Sans",
//      fontSize: 14,
//      fontColor: "#36a2eb"
//    },
//      scales: {
//             xAxes: [{
//                 stacked: true
//             }],
//             yAxes: [{
//                 stacked: true
//             }]
//         },
//            xAxes: [{
//      scaleLabel: {
//        display: true,
//        labelString: 'Time',
//        fontSize: 18,
//          fontFamily: "Noto Sans"
//        //fontColor: 'green'
//      },
//       ticks: {
//                fontSize: 13,
//              fontFamily: " Helvetica Neue"
//                //fontColor: 'red'        
//            }
//    }],   
//    yAxes: [{
//      scaleLabel: {
//        display: true,
//        labelString: 'Frame Count',
//        fontSize: 18,
//          fontFamily: "Noto Sans"
//        //fontColor: 'green'
//      },
//       ticks: {
//                fontSize: 13,
//              fontFamily: " Helvetica Neue"
//                //fontColor: 'red'        
//            }
//    }],
// legend: {
//   position: 'bottom'
// }
// };
  

//   public articleChartOptions:any = {
//     scaleShowVerticalLines: false,
//     scales: {
//            xAxes: [{
//                display: false
//            }]
//        },
//     responsive: true
//   };

  public randomize():void {
    }
ngAfterViewInit () {
           !function(d,s,id){
               var js: any,
                   fjs=d.getElementsByTagName(s)[0],
                   p='https';
               if(!d.getElementById(id)){
                   js=d.createElement(s);
                   js.id=id;
                   js.src=p+"://platform.twitter.com/widgets.js";
                   fjs.parentNode.insertBefore(js,fjs);
               }
           }
           (document,"script","twitter-wjs");
  }

}




