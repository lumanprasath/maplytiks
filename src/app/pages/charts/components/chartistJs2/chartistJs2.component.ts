import {Component, ViewEncapsulation, Inject, Input, Output, EventEmitter, ViewChild,ElementRef  } from '@angular/core';
import {View} from "angular2/angular2";
import {HttpServices} from "../../../../shared/services/httpservice";
import {ChartistJs2Service} from './chartistJs2.service';
import {BaThemeConfigProvider, layoutPaths} from '../../../../theme';
import { DaterangepickerConfig } from 'ng2-daterangepicker';
import * as moment from 'moment';
import {BaThemePreloader} from '../../../../theme/services';

import '../../../../theme/components/baAmChart/baAmChart.loader.ts';
import {BaAmChartThemeService} from '../../../../theme/components/baAmChart/baAmChartTheme.service';




@Component({
  selector: 'chartist-js2',
  encapsulation: ViewEncapsulation.None,
  styles: [require('chartist/dist/chartist.css'), require('./chartistJs2.scss')],
  template: require('./chartistJs2.html'),
  providers: [BaAmChartThemeService],
  })




export class ChartistJs2 {
 

   
  
private dateInputs: any = [
       {
           start: moment(),
           end: moment().add(5, 'month'),
       }
   ];

  data2:any;
  public mapchartData:Object;
  private dropDownDate:any[];
  private selectedDate:any;
  private dropDownBrand:any[];
  private selectedBrand:any;
  private dropDownChannel:any[];
  private selectedChannel:any;
  public cloudData:any;
  public mapData:any[];

  private polarOptions:any;

  public sentimentLabels:string[];
  public sentimentData:number[] 
  public sentimentChartType:string;
  private sentimentOptions:any;

  public userClassLabels:string[];
  public userClassData:number[] 
  public userClassChartType:string;
  public userClassLegend:boolean = false;
  
  public topUserLegend:boolean = true;
  public topUserLabels:string[];
  private topUserOptions: any;
  public topUserData:number[];
  public topUserChartType:string;

  public topMentionLabels:string[];
  public topMentionChartType:string;
  public topMentionLegend:boolean = true;
  public topMentionData:any[];
  private topMentionColor:any[];
  public topDomainLabels:string[];
  public topDomainChartType:string;
  public topDomainLegend:boolean = true;
  public topDomainData:any[];
  private topDomainColor:any[];


  public topReachLabels:string[];
  public topReachChartType:string;
  public topReachLegend:boolean = true;
  public topReachData:any[];
  private topReachColor:any[];

  public lineChartData:Array<any> = [];
  public lineChartLabels:Array<any> = [];
  public lineChartColors:Array<any> = [];
  public lineChartOptions:any = {
    animation: false,
    responsive: true
  };
  
  public lineChartLegend:boolean = true;
  public lineChartType:string;
  private url_1:string;
  private url_2:string;
  private url_3:string;
  private url_4:string;
  private words:any;
  private start_date:any;
  private end_date:any;

  public languageLabels:string[];
  public languageData:any;
  private languageChartType:string;
  private languageColor:Array<any> = [];
 
   private totalarticlesengagement = 0;
   private totalarticlecount =0;
   private totalimpact =0;
   private totalreach =0
   private totalengagedusers =0;
   private twitterFeeds:any;
  //private dateToday:string;
  //private dateMax:string;

  public polarAreaChartLabels:string[];
  public polarAreaChartData:number[];
  public polarAreaLegend:boolean = true;
  public polarAreaChartType:string;
   @ViewChild('baAmChart') private _selector:ElementRef;


  chartData:Object;
  scatterChartOptions:any;
 

  constructor(private _chartistJs2Service:ChartistJs2Service,private _baConfig:BaThemeConfigProvider, private _httpService: HttpServices,
  private daterangepickerOptions: DaterangepickerConfig,
  private _baAmChartThemeService:BaAmChartThemeService) {
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



  ngOnInit() {
   
   
    
    AmCharts.themes.blur = this._baAmChartThemeService.getTheme();
      
    let self = this;
    self.words = [ { text: 'Coca-Cola', weight: 1466 },
  { text: 'Coca', weight: 1080 },
  { text: 'Cola', weight: 1024 },
  { text: 'Christmas', weight: 647 },
  { text: 'advert', weight: 582 },
  { text: 'Coke', weight: 417 },
  { text: 'cola', weight: 372 },
  { text: 'Zero', weight: 323 },
  { text: 'way', weight: 322 },
  { text: 'coca', weight: 322 },
  { text: 'Diet', weight: 319 },
  { text: '#MasterTheChoiceIMAXSweepstakes', weight: 313 },
  { text: 'Rebellion', weight: 313 },
  { text: 'Empire', weight: 312 },
  { text: 'Rogue', weight: 303 },
  { text: 'Either', weight: 302 },
  { text: '#HolidaysAreComing', weight: 232 }
   ];
      jQuery("#col1").jQCloud(self.words,{
  autoResize: true
});


// jQuery('.autoplay').slick({
//   slidesToShow: 3,
//   slidesToScroll: 1,
//   autoplay: true,
//   autoplaySpeed: 2000,
// });

                    //console.log(jQuery().jQCloud);
  
                 

  self.twitterFeeds = [
    {
      url: "https://twitter.com/AMAs/status/800378679536676864",
    },
    {
      url:  "https://twitter.com/AMAs/status/800458706823561216",
    },
    {
      url: "https://twitter.com/AMAs/status/800466263034109952",
    },
    {
      url: "https://twitter.com/AMAs/status/800443605223501824",
    }
  ];

    self.sentimentLabels = ['Download Sales', 'In-Store Sales', 'Mail Sales'];
    self.sentimentData = [300, 500, 100];
    self.userClassLabels = ['Download Sales', 'In-Store Sales', 'Mail Sales'];
    self.userClassData = [300, 500, 100];
    self.topUserLabels = ['Download Sales', 'In-Store Sales', 'Mail Sales', 'Telesales', 'Corporate Sales'];
    self.topUserData = [300, 500, 100, 40, 120];
    self.polarAreaChartData = [300, 500, 100, 40, 120];
    self.polarAreaChartLabels = ['Download Sales', 'In-Store Sales', 'Mail Sales', 'Telesales', 'Corporate Sales'];
    
    //this.chartData = self.getDataWithParam();

   self.polarAreaChartType = 'polarArea';

    self.url_1 =  "https://twitter.com/AMAs/status/800378679536676864";
     self.url_2 =  "https://twitter.com/AMAs/status/800458706823561216";
     self.url_3 =  "https://twitter.com/AMAs/status/800466263034109952";
     self.url_4 =  "https://twitter.com/AMAs/status/800443605223501824";


    self.sentimentChartType  = 'doughnut';
    self.sentimentOptions = {
        tooltips: {
            callbacks: {
                label: function(tooltipItem, data) {
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
        }
    }

    self.polarOptions =[{scaleShowLabels : false}];
  
    self.userClassChartType = 'radar';
    self.topUserChartType = 'pie';
    self.topUserOptions = {
           tooltips: {
            callbacks: {
                label: function(tooltipItem, data) {
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
        }
    }
    self.topMentionChartType = 'bar';
    self.topDomainChartType = 'horizontalBar';
    self.topReachChartType ='bar';
    self.topMentionLabels = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
    self.topMentionColor = [{
      backgroundColor:['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(255, 206, 86, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(153, 102, 255, 0.2)', 'rgba(255, 159, 64, 0.2)','rgba(0,10,220,0.5)','rgba(220,0,10,0.5)','rgba(220,0,0,0.5)','rgba(120,250,120,0.5)'],
      hoverBackgroundColor:"rgba(54, 162, 235, 0.2)",
      borderColor:"#1EF9A1",
      hoverBorderColor:"#7FFD1F"
    }];
    self.topMentionData = [{data: [65, 59, 80, 81, 56, 55, 40], label: 'Top Mentions'}];

    self.topDomainLabels = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
    self.topDomainData = [{ label: 'Top Domain',data: [65, 59, 80, 81, 56, 55, 40] }];
    self.topDomainColor = [{
      backgroundColor:['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(255, 206, 86, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(153, 102, 255, 0.2)', 'rgba(255, 159, 64, 0.2)','rgba(0,10,220,0.5)','rgba(220,0,10,0.5)','rgba(220,0,0,0.5)','rgba(120,250,120,0.5)'],
      hoverBackgroundColor:"rgba(54, 162, 235, 0.2)",
      borderColor:"#1EF9A1",
      hoverBorderColor:"#7FFD1F"
    }];


    self.topReachLabels = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
    self.topReachData = [{ label: 'Top Domain',data: [65, 59, 80, 81, 56, 55, 40] }];
    self.topReachColor = [{
      backgroundColor:['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(255, 206, 86, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(153, 102, 255, 0.2)', 'rgba(255, 159, 64, 0.2)','rgba(0,10,220,0.5)','rgba(220,0,10,0.5)','rgba(220,0,0,0.5)','rgba(120,250,120,0.5)','rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(255, 206, 86, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(153, 102, 255, 0.2)', 'rgba(255, 159, 64, 0.2)','rgba(0,10,220,0.5)','rgba(220,0,10,0.5)','rgba(220,0,0,0.5)','rgba(120,250,120,0.5)','rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(255, 206, 86, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(153, 102, 255, 0.2)', 'rgba(255, 159, 64, 0.2)','rgba(0,10,220,0.5)','rgba(220,0,10,0.5)','rgba(220,0,0,0.5)','rgba(120,250,120,0.5)','rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(255, 206, 86, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(153, 102, 255, 0.2)', 'rgba(255, 159, 64, 0.2)','rgba(0,10,220,0.5)','rgba(220,0,10,0.5)','rgba(220,0,0,0.5)','rgba(120,250,120,0.5)','rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(255, 206, 86, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(153, 102, 255, 0.2)', 'rgba(255, 159, 64, 0.2)','rgba(0,10,220,0.5)','rgba(220,0,10,0.5)','rgba(220,0,0,0.5)','rgba(120,250,120,0.5)','rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(255, 206, 86, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(153, 102, 255, 0.2)', 'rgba(255, 159, 64, 0.2)','rgba(0,10,220,0.5)','rgba(220,0,10,0.5)','rgba(220,0,0,0.5)','rgba(120,250,120,0.5)','rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(255, 206, 86, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(153, 102, 255, 0.2)', 'rgba(255, 159, 64, 0.2)','rgba(0,10,220,0.5)','rgba(220,0,10,0.5)','rgba(220,0,0,0.5)','rgba(120,250,120,0.5)','rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(255, 206, 86, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(153, 102, 255, 0.2)', 'rgba(255, 159, 64, 0.2)','rgba(0,10,220,0.5)','rgba(220,0,10,0.5)','rgba(220,0,0,0.5)','rgba(120,250,120,0.5)','rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(255, 206, 86, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(153, 102, 255, 0.2)', 'rgba(255, 159, 64, 0.2)','rgba(0,10,220,0.5)','rgba(220,0,10,0.5)','rgba(220,0,0,0.5)','rgba(120,250,120,0.5)'],
      hoverBackgroundColor:"rgba(54, 162, 235, 0.2)",
      borderColor:"#1EF9A1",
      hoverBorderColor:"#7FFD1F"
    }];


    self.lineChartData =  [ {data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A'}];
     self.lineChartLabels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
      self.lineChartType ='line';
     self.lineChartColors = [
    { // grey
     backgroundColor: 'rgba(54, 162, 235, 0.2)',
     borderColor: '#00acac',
     pointBackgroundColor: '#348fe2',
     pointBorderColor: '#fff',
     pointHoverBackgroundColor: '#fff',
     pointHoverBorderColor: 'rgba(148,159,177,0.8)'
   }
  ];






       self.mapData  = [{"code":"BE","name":"Belgium","value":19,"color":"#e7ba08"},{"code":"BG","name":"Bulgaria","value":1,"color":"#e7ba08"},{"code":"BA","name":"Bosnia and Herzegovina","value":2,"color":"#e7ba08"},{"code":"JP","name":"Japan","value":7,"color":"#0091d8"},{"code":"JM","name":"Jamaica","value":4,"color":"#00abff"},{"code":"BW","name":"Botswana","value":1,"color":"#f95372"},{"code":"BR","name":"Brazil","value":20,"color":"#8bd22f"},{"code":"RU","name":"Russia","value":4,"color":"#e7ba08"},{"code":"RS","name":"Serbia","value":3,"color":"#e7ba08"},{"code":"RO","name":"Romania","value":1,"color":"#e7ba08"},{"code":"GT","name":"Guatemala","value":1,"color":"#00abff"},{"code":"GR","name":"Greece","value":1,"color":"#e7ba08"},{"code":"GB","name":"United Kingdom","value":345,"color":"#e7ba08"},{"code":"GH","name":"Ghana","value":2,"color":"#f95372"},{"code":"HR","name":"Croatia","value":1,"color":"#e7ba08"},{"code":"HT","name":"Haiti","value":1,"color":"#00abff"},{"code":"HU","name":"Hungary","value":1,"color":"#e7ba08"},{"code":"HK","name":"Hong Kong, China","value":4,"color":"#0091d8"},{"code":"PT","name":"Portugal","value":5,"color":"#e7ba08"},{"code":"PA","name":"Panama","value":2,"color":"#00abff"},{"code":"UY","name":"Uruguay","value":8,"color":"#8bd22f"},{"code":"PE","name":"Peru","value":2,"color":"#8bd22f"},{"code":"PK","name":"Pakistan","value":10,"color":"#0091d8"},{"code":"PH","name":"Philippines","value":8,"color":"#0091d8"},{"code":"PL","name":"Poland","value":3,"color":"#e7ba08"},{"code":"EE","name":"Estonia","value":1,"color":"#e7ba08"},{"code":"EG","name":"Egypt","value":5,"color":"#f95372"},{"code":"ZA","name":"South Africa","value":25,"color":"#f95372"},{"code":"EC","name":"Ecuador","value":20,"color":"#8bd22f"},{"code":"ZW","name":"Zimbabwe","value":2,"color":"#f95372"},{"code":"ES","name":"Spain","value":19,"color":"#e7ba08"},{"code":"MA","name":"Morocco","value":43,"color":"#f95372"},{"code":"MM","name":"Myanmar","value":1,"color":"#0091d8"},{"code":"MN","name":"Mongolia","value":1,"color":"#0091d8"},{"code":"MK","name":"Macedonia, FYR","value":1,"color":"#e7ba08"},{"code":"MY","name":"Malaysia","value":5,"color":"#0091d8"},{"code":"MX","name":"Mexico","value":8,"color":"#00abff"},{"code":"FR","name":"France","value":6,"color":"#e7ba08"},{"code":"FI","name":"Finland","value":2,"color":"#e7ba08"},{"code":"NI","name":"Nicaragua","value":1,"color":"#00abff"},{"code":"NL","name":"Netherlands","value":95,"color":"#e7ba08"},{"code":"NO","name":"Norway","value":3,"color":"#e7ba08"},{"code":"NA","name":"Namibia","value":1,"color":"#f95372"},{"code":"NG","name":"Nigeria","value":21,"color":"#f95372"},{"code":"NZ","name":"New Zealand","value":9,"color":"#c49e06"},{"code":"CH","name":"Switzerland","value":3,"color":"#e7ba08"},{"code":"CO","name":"Colombia","value":4,"color":"#8bd22f"},{"code":"CN","name":"China","value":66,"color":"#0091d8"},{"code":"CL","name":"Chile","value":2,"color":"#8bd22f"},{"code":"CA","name":"Canada","value":55,"color":"#00abff"},{"code":"CR","name":"Costa Rica","value":1,"color":"#00abff"},{"code":"KE","name":"Kenya","value":16,"color":"#f95372"},{"code":"KR","name":"Korea, Rep.","value":1,"color":"#0091d8"},{"code":"SI","name":"Slovenia","value":2,"color":"#e7ba08"},{"code":"SO","name":"Somalia","value":1,"color":"#f95372"},{"code":"KW","name":"Kuwait","value":1,"color":"#0091d8"},{"code":"SA","name":"Saudi Arabia","value":5,"color":"#0091d8"},{"code":"SG","name":"Singapore","value":2,"color":"#0091d8"},{"code":"SE","name":"Sweden","value":2,"color":"#e7ba08"},{"code":"DO","name":"Dominican Rep.","value":9,"color":"#00abff"},{"code":"DK","name":"Denmark","value":2,"color":"#e7ba08"},{"code":"DE","name":"Germany","value":12,"color":"#e7ba08"},{"code":"US","name":"United States","value":872,"color":"#00abff"},{"code":"TZ","name":"Tanzania","value":2,"color":"#f95372"},{"code":"LA","name":"Laos","value":1,"color":"#0091d8"},{"code":"TR","name":"Turkey","value":2,"color":"#e7ba08"},{"code":"TN","name":"Tunisia","value":1,"color":"#f95372"},{"code":"LT","name":"Lithuania","value":1,"color":"#e7ba08"},{"code":"LU","name":"Luxembourg","value":1,"color":"#e7ba08"},{"code":"TH","name":"Thailand","value":6,"color":"#0091d8"},{"code":"AE","name":"United Arab Emirates","value":14,"color":"#0091d8"},{"code":"VE","name":"Venezuela","value":11,"color":"#8bd22f"},{"code":"IQ","name":"Iraq","value":3,"color":"#0091d8"},{"code":"IT","name":"Italy","value":6,"color":"#e7ba08"},{"code":"VN","name":"Vietnam","value":18,"color":"#0091d8"},{"code":"AR","name":"Argentina","value":4,"color":"#8bd22f"},{"code":"AU","name":"Australia","value":22,"color":"#c49e06"},{"code":"IL","name":"Israel","value":3,"color":"#0091d8"},{"code":"IN","name":"India","value":38,"color":"#0091d8"},{"code":"LB","name":"Lebanon","value":2,"color":"#0091d8"},{"code":"AZ","name":"Azerbaijan","value":1,"color":"#e7ba08"},{"code":"IE","name":"Ireland","value":42,"color":"#e7ba08"},{"code":"ID","name":"Indonesia","value":4,"color":"#0091d8"},{"code":"BD","name":"Bangladesh","value":2,"color":"#0091d8"}];

       self.transformationLocation(self.mapData,self);

       
       self.languageChartType = 'doughnut';
   self.languageLabels = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
   self.languageColor = [{
     backgroundColor:['rgba(255, 206, 86, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(153, 102, 255, 0.2)', 'rgba(255, 159, 64, 0.2)','rgba(0,10,220,0.5)','rgba(220,0,10,0.5)','rgba(220,0,0,0.5)','rgba(120,250,120,0.5)','rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(255, 206, 86, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(153, 102, 255, 0.2)', 'rgba(255, 206, 86, 0.2)', 'rgba(255, 99, 132, 0.2)', 'rgba(153, 102, 255, 0.2)', 'rgba(255, 159, 64, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(153, 102, 255, 0.2)', 'rgba(255, 159, 64, 0.2)','rgba(0,10,220,0.5)','rgba(220,0,10,0.5)','rgba(220,0,0,0.5)','rgba(120,250,120,0.5)','rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(255, 206, 86, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(153, 102, 255, 0.2)', 'rgba(255, 159, 64, 0.2)','rgba(0,10,220,0.5)','rgba(220,0,10,0.5)'],
     hoverBackgroundColor:"rgba(54, 162, 235, 0.2)",
     hoverBorderColor:"#7FFD1F"
   }];
   self.languageData = [{data: [65, 59, 80, 81, 56, 55, 40], label: 'Top Mentions'}];
                   

    this._httpService.GetHttp("twit-by-date")
            .subscribe(
            (data2) => {
              self.selectedDate = data2[1];
              self.transformationDateDropdown(data2, self);
            },
            (error) => {
               console.log(error);
            }
            );


this._httpService.GetHttp("twit-brand")
            .subscribe(
            (data2) => {
             self.selectedBrand = data2[0];
             self.transformationBrandDropdown(data2, self);
            },
            (error) => {
               console.log(error);
            }
            
            );

this._httpService.GetHttp("channel")
            .subscribe(
            (data2) => {
              self.selectedChannel = data2[0];
              self.transformationChannalDropdown(data2, self);
             
            },
            (error) => {
               console.log(error);
            }
            );


 let post_data= {};
 post_data = {
        channel:"twitter",
        brand:"coke",
        date: "2016-11-20"
    }

this._httpService.PostHttp(JSON.stringify(post_data),"twit-by-social")
            .subscribe(
            (data2) => {
    self.ProcessTwitt_Data(data2,self);
    },
       (error) => {
               console.log(error);
            }
    )
}

   

  
 formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
}

     
 ProcessTwitt_Data(data2,self){
   

   var ilabel = data2.impact_score_label;
    var rlabel = data2.reach_label;  

    self.totalimpact = data2.impact_score;
    self.totalreach = data2.reach;
    self.totalengagedusers = data2.engaged_users;
    self.totalarticlesengagement = data2.articles_engagements;
    self.totalarticlecount = data2.articles_count;

    self.polarAreaChartData = [ self.totalarticlecount, self.totalarticlesengagement,  self.totalengagedusers,  self.totalreach, self.totalimpact ];
    self.polarAreaChartLabels = ['Total Articles','Articles Engagement',  'Engaged Users',  rlabel, ilabel];


    self.topMentionLabels = data2.mentions_chart_label;
    var data_mention = data2.mentions_chart_value;
    self.topMentionData = [{data: data_mention, label: 'Top Mentions'}];
    
    self.topDomainLabels = data2.domain_chart_label;
    var data_domain = data2.domain_chart_value;
    self.topDomainData = [{data: data_domain, label: 'Top Domain'}];
    
    self.sentimentLabels = data2.sentiment_label,
    self.sentimentData= data2.sentiment_value
    self.userClassLabels = data2.users_classification_label,
    self.userClassData = data2.users_classification_value
    self.topUserLabels = data2.top_users_label,
    self.topUserData = data2.top_users_value

    self.languageLabels = data2.language_label;
   var data_language = data2.language_value;
   self.languageData = [{data: data_language, label: 'Languages'}];
    //var hastag_value = self.makeHasTagInput(data2.hastags_chart_value);
    //var hastag_label = self.makeHasTagInput(data2.hastags_chart_label);
    

    //self.lineChartData =  [ {data: hastag_value, label: 'HashTag'}];
    //self.lineChartLabels = hastag_label;
   //self.words = []; 
   self.words=data2.hastag_result;
   //console.log(JSON.stringify(self.words));

  jQuery("#col1").jQCloud('update',self.words,{  
        autoResize: true
      });







    
    
    
    if(data2.hasOwnProperty("top_articles")){
     self.url_1 =  "https://twitter.com/AMAs/status/800378679536676864";
     self.url_2 =  "https://twitter.com/AMAs/status/800458706823561216";
     self.url_3 =  "https://twitter.com/AMAs/status/800466263034109952";
     self.url_4 =  "https://twitter.com/AMAs/status/800443605223501824";

self.mapData = self.getMapLocationData(data2.article_locations,self);
      self.transformationLocation(self.mapData,self);
};
   
  }
  


  getResponsive(padding, offset) {
    return this._chartistJs2Service.getResponsive(padding, offset);
  }




  OnChangeDate() {
    let self = this;
    let post_data= {};
    if(self.start_date === self.end_date) {
      console.log('strat Date');
       
      post_data = { channel:this.selectedChannel,brand:this.selectedBrand, date: self.start_date } 
      self.twitBySameDateAPI(post_data,self);
    } else {
      console.log('called diff');
       
      post_data = { channel:this.selectedChannel,brand:this.selectedBrand, start_date: self.start_date,end_date: self.end_date }
      self.twitByDiffDateAPI(post_data,self);
    }
}

twitBySameDateAPI(post_data,self){
  self._httpService.PostHttp(JSON.stringify(post_data),"twit-by-social")
            .subscribe(
            (data2) => {
     self.ProcessTwitt_Data(data2,self)
  

    },
            (error) => {
               console.log(error);
            }
  );
}

twitByDiffDateAPI(post_data,self){
  self._httpService.PostHttp(JSON.stringify(post_data),"twit-bydate-social")
            .subscribe(
            (data2) => {
     self.ProcessTwitt_Data(data2,self)
  

    },
            (error) => {
               console.log(error);
            }
  );
}





   private selectDate(value: any, dateInput: any) {
      let self = this;
       dateInput.start = value.start;
       dateInput.end = value.end;
       self.start_date = this.formatDate(dateInput.start);
       self.end_date = this.formatDate(dateInput.end);
       self.OnChangeDate()
       

       }
       

       
   


  OnChangeBrand() {
     let self = this;
     self.OnChangeDate();
  }



  OnChangeChannel() {
    let self = this;
    self.OnChangeDate();

  }

  // events
  public chartClicked(e:any):void {
    //console.log(e);
  }

  public chartHovered(e:any):void {
    //console.log(e);
  }

 public barChartOptions:any = {
    scaleShowVerticalLines: false,
    responsive: true
  };

  public articleChartOptions:any = {
    scaleShowVerticalLines: false,
    scales: {
           xAxes: [{
               display: false
           }]
       },
    responsive: true
  };

  public randomize():void {
    // Only Change 3 values
    let data = [
      Math.round(Math.random() * 100),
      59,
      80,
      (Math.random() * 100),
      56,
      (Math.random() * 100),
      40];
    let clone = JSON.parse(JSON.stringify(this.topMentionData));
    clone[0].data = data;
    this.topMentionData = clone;
    /**
     * (My guess), for Angular to recognize the change in the dataset
     * it has to change the dataset variable directly,
     * so one way around it, is to clone the data, change it and then
     * assign it;
     */

    let _lineChartData:Array<any> = new Array(this.lineChartData.length);
    for (let i = 0; i < this.lineChartData.length; i++) {
      _lineChartData[i] = {data: new Array(this.lineChartData[i].data.length), label: this.lineChartData[i].label};
      for (let j = 0; j < this.lineChartData[i].data.length; j++) {
        _lineChartData[i].data[j] = Math.floor((Math.random() * 100) + 1);
      }
    }
    this.lineChartData = _lineChartData;

  }




getMapLocationData(result,self){


   var mapResult = [];

    for (var key in result) {
            if (key !== "") {
                var data = self.getMapData(key,result[key]);
                mapResult.push(data);
            }

  }
  
return mapResult;

  
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

getMapData(key,value){
   var layoutColors = this._baConfig.get().colors;
   var mapData = [
      {'code': 'AF', 'name': 'Afghanistan', 'value': 32358260, 'color': layoutColors.primaryDark},
      {'code': 'AL', 'name': 'Albania', 'value': 3215988, 'color': layoutColors.warning},
      {'code': 'DZ', 'name': 'Algeria', 'value': 35980193, 'color': layoutColors.danger},
      {'code': 'AO', 'name': 'Angola', 'value': 19618432, 'color': layoutColors.danger},
      {'code': 'AR', 'name': 'Argentina', 'value': 40764561, 'color': layoutColors.success},
      {'code': 'AM', 'name': 'Armenia', 'value': 3100236, 'color': layoutColors.warning},
      {'code': 'AU', 'name': 'Australia', 'value': 22605732, 'color': layoutColors.warningDark},
      {'code': 'AT', 'name': 'Austria', 'value': 8413429, 'color': layoutColors.warning},
      {'code': 'AZ', 'name': 'Azerbaijan', 'value': 9306023, 'color': layoutColors.warning},
      {'code': 'BH', 'name': 'Bahrain', 'value': 1323535, 'color': layoutColors.primaryDark},
      {'code': 'BD', 'name': 'Bangladesh', 'value': 150493658, 'color': layoutColors.primaryDark},
      {'code': 'BY', 'name': 'Belarus', 'value': 9559441, 'color': layoutColors.warning},
      {'code': 'BE', 'name': 'Belgium', 'value': 10754056, 'color': layoutColors.warning},
      {'code': 'BJ', 'name': 'Benin', 'value': 9099922, 'color': layoutColors.danger},
      {'code': 'BT', 'name': 'Bhutan', 'value': 738267, 'color': layoutColors.primaryDark},
      {'code': 'BO', 'name': 'Bolivia', 'value': 10088108, 'color': layoutColors.success},
      {'code': 'BA', 'name': 'Bosnia and Herzegovina', 'value': 3752228, 'color': layoutColors.warning},
      {'code': 'BW', 'name': 'Botswana', 'value': 2030738, 'color': layoutColors.danger},
      {'code': 'BR', 'name': 'Brazil', 'value': 196655014, 'color': layoutColors.success},
      {'code': 'BN', 'name': 'Brunei', 'value': 405938, 'color': layoutColors.primaryDark},
      {'code': 'BG', 'name': 'Bulgaria', 'value': 7446135, 'color': layoutColors.warning},
      {'code': 'BF', 'name': 'Burkina Faso', 'value': 16967845, 'color': layoutColors.danger},
      {'code': 'BI', 'name': 'Burundi', 'value': 8575172, 'color': layoutColors.danger},
      {'code': 'KH', 'name': 'Cambodia', 'value': 14305183, 'color': layoutColors.primaryDark},
      {'code': 'CM', 'name': 'Cameroon', 'value': 20030362, 'color': layoutColors.danger},
      {'code': 'CA', 'name': 'Canada', 'value': 34349561, 'color': layoutColors.primary},
      {'code': 'CV', 'name': 'Cape Verde', 'value': 500585, 'color': layoutColors.danger},
      {'code': 'CF', 'name': 'Central African Rep.', 'value': 4486837, 'color': layoutColors.danger},
      {'code': 'TD', 'name': 'Chad', 'value': 11525496, 'color': layoutColors.danger},
      {'code': 'CL', 'name': 'Chile', 'value': 17269525, 'color': layoutColors.success},
      {'code': 'CN', 'name': 'China', 'value': 1347565324, 'color': layoutColors.primaryDark},
      {'code': 'CO', 'name': 'Colombia', 'value': 46927125, 'color': layoutColors.success},
      {'code': 'KM', 'name': 'Comoros', 'value': 753943, 'color': layoutColors.danger},
      {'code': 'CD', 'name': 'Congo, Dem. Rep.', 'value': 67757577, 'color': layoutColors.danger},
      {'code': 'CG', 'name': 'Congo, Rep.', 'value': 4139748, 'color': layoutColors.danger},
      {'code': 'CR', 'name': 'Costa Rica', 'value': 4726575, 'color': layoutColors.primary},
      {'code': 'CI', 'name': 'Cote d\'Ivoire', 'value': 20152894, 'color': layoutColors.danger},
      {'code': 'HR', 'name': 'Croatia', 'value': 4395560, 'color': layoutColors.warning},
      {'code': 'CU', 'name': 'Cuba', 'value': 11253665, 'color': layoutColors.primary},
      {'code': 'CY', 'name': 'Cyprus', 'value': 1116564, 'color': layoutColors.warning},
      {'code': 'CZ', 'name': 'Czech Rep.', 'value': 10534293, 'color': layoutColors.warning},
      {'code': 'DK', 'name': 'Denmark', 'value': 5572594, 'color': layoutColors.warning},
      {'code': 'DJ', 'name': 'Djibouti', 'value': 905564, 'color': layoutColors.danger},
      {'code': 'DO', 'name': 'Dominican Rep.', 'value': 10056181, 'color': layoutColors.primary},
      {'code': 'EC', 'name': 'Ecuador', 'value': 14666055, 'color': layoutColors.success},
      {'code': 'EG', 'name': 'Egypt', 'value': 82536770, 'color': layoutColors.danger},
      {'code': 'SV', 'name': 'El Salvador', 'value': 6227491, 'color': layoutColors.primary},
      {'code': 'GQ', 'name': 'Equatorial Guinea', 'value': 720213, 'color': layoutColors.danger},
      {'code': 'ER', 'name': 'Eritrea', 'value': 5415280, 'color': layoutColors.danger},
      {'code': 'EE', 'name': 'Estonia', 'value': 1340537, 'color': layoutColors.warning},
      {'code': 'ET', 'name': 'Ethiopia', 'value': 84734262, 'color': layoutColors.danger},
      {'code': 'FJ', 'name': 'Fiji', 'value': 868406, 'color': layoutColors.warningDark},
      {'code': 'FI', 'name': 'Finland', 'value': 5384770, 'color': layoutColors.warning},
      {'code': 'FR', 'name': 'France', 'value': 63125894, 'color': layoutColors.warning},
      {'code': 'GA', 'name': 'Gabon', 'value': 1534262, 'color': layoutColors.danger},
      {'code': 'GM', 'name': 'Gambia', 'value': 1776103, 'color': layoutColors.danger},
      {'code': 'GE', 'name': 'Georgia', 'value': 4329026, 'color': layoutColors.warning},
      {'code': 'DE', 'name': 'Germany', 'value': 82162512, 'color': layoutColors.warning},
      {'code': 'GH', 'name': 'Ghana', 'value': 24965816, 'color': layoutColors.danger},
      {'code': 'GR', 'name': 'Greece', 'value': 11390031, 'color': layoutColors.warning},
      {'code': 'GT', 'name': 'Guatemala', 'value': 14757316, 'color': layoutColors.primary},
      {'code': 'GN', 'name': 'Guinea', 'value': 10221808, 'color': layoutColors.danger},
      {'code': 'GW', 'name': 'Guinea-Bissau', 'value': 1547061, 'color': layoutColors.danger},
      {'code': 'GY', 'name': 'Guyana', 'value': 756040, 'color': layoutColors.success},
      {'code': 'HT', 'name': 'Haiti', 'value': 10123787, 'color': layoutColors.primary},
      {'code': 'HN', 'name': 'Honduras', 'value': 7754687, 'color': layoutColors.primary},
      {'code': 'HK', 'name': 'Hong Kong, China', 'value': 7122187, 'color': layoutColors.primaryDark},
      {'code': 'HU', 'name': 'Hungary', 'value': 9966116, 'color': layoutColors.warning},
      {'code': 'IS', 'name': 'Iceland', 'value': 324366, 'color': layoutColors.warning},
      {'code': 'IN', 'name': 'India', 'value': 1241491960, 'color': layoutColors.primaryDark},
      {'code': 'ID', 'name': 'Indonesia', 'value': 242325638, 'color': layoutColors.primaryDark},
      {'code': 'IR', 'name': 'Iran', 'value': 74798599, 'color': layoutColors.primaryDark},
      {'code': 'IQ', 'name': 'Iraq', 'value': 32664942, 'color': layoutColors.primaryDark},
      {'code': 'IE', 'name': 'Ireland', 'value': 4525802, 'color': layoutColors.warning},
      {'code': 'IL', 'name': 'Israel', 'value': 7562194, 'color': layoutColors.primaryDark},
      {'code': 'IT', 'name': 'Italy', 'value': 60788694, 'color': layoutColors.warning},
      {'code': 'JM', 'name': 'Jamaica', 'value': 2751273, 'color': layoutColors.primary},
      {'code': 'JP', 'name': 'Japan', 'value': 126497241, 'color': layoutColors.primaryDark},
      {'code': 'JO', 'name': 'Jordan', 'value': 6330169, 'color': layoutColors.primaryDark},
      {'code': 'KZ', 'name': 'Kazakhstan', 'value': 16206750, 'color': layoutColors.primaryDark},
      {'code': 'KE', 'name': 'Kenya', 'value': 41609728, 'color': layoutColors.danger},
      {'code': 'KP', 'name': 'Korea, Dem. Rep.', 'value': 24451285, 'color': layoutColors.primaryDark},
      {'code': 'KR', 'name': 'Korea, Rep.', 'value': 48391343, 'color': layoutColors.primaryDark},
      {'code': 'KW', 'name': 'Kuwait', 'value': 2818042, 'color': layoutColors.primaryDark},
      {'code': 'KG', 'name': 'Kyrgyzstan', 'value': 5392580, 'color': layoutColors.primaryDark},
      {'code': 'LA', 'name': 'Laos', 'value': 6288037, 'color': layoutColors.primaryDark},
      {'code': 'LV', 'name': 'Latvia', 'value': 2243142, 'color': layoutColors.warning},
      {'code': 'LB', 'name': 'Lebanon', 'value': 4259405, 'color': layoutColors.primaryDark},
      {'code': 'LS', 'name': 'Lesotho', 'value': 2193843, 'color': layoutColors.danger},
      {'code': 'LR', 'name': 'Liberia', 'value': 4128572, 'color': layoutColors.danger},
      {'code': 'LY', 'name': 'Libya', 'value': 6422772, 'color': layoutColors.danger},
      {'code': 'LT', 'name': 'Lithuania', 'value': 3307481, 'color': layoutColors.warning},
      {'code': 'LU', 'name': 'Luxembourg', 'value': 515941, 'color': layoutColors.warning},
      {'code': 'MK', 'name': 'Macedonia, FYR', 'value': 2063893, 'color': layoutColors.warning},
      {'code': 'MG', 'name': 'Madagascar', 'value': 21315135, 'color': layoutColors.danger},
      {'code': 'MW', 'name': 'Malawi', 'value': 15380888, 'color': layoutColors.danger},
      {'code': 'MY', 'name': 'Malaysia', 'value': 28859154, 'color': layoutColors.primaryDark},
      {'code': 'ML', 'name': 'Mali', 'value': 15839538, 'color': layoutColors.danger},
      {'code': 'MR', 'name': 'Mauritania', 'value': 3541540, 'color': layoutColors.danger},
      {'code': 'MU', 'name': 'Mauritius', 'value': 1306593, 'color': layoutColors.danger},
      {'code': 'MX', 'name': 'Mexico', 'value': 114793341, 'color': layoutColors.primary},
      {'code': 'MD', 'name': 'Moldova', 'value': 3544864, 'color': layoutColors.warning},
      {'code': 'MN', 'name': 'Mongolia', 'value': 2800114, 'color': layoutColors.primaryDark},
      {'code': 'ME', 'name': 'Montenegro', 'value': 632261, 'color': layoutColors.warning},
      {'code': 'MA', 'name': 'Morocco', 'value': 32272974, 'color': layoutColors.danger},
      {'code': 'MZ', 'name': 'Mozambique', 'value': 23929708, 'color': layoutColors.danger},
      {'code': 'MM', 'name': 'Myanmar', 'value': 48336763, 'color': layoutColors.primaryDark},
      {'code': 'NA', 'name': 'Namibia', 'value': 2324004, 'color': layoutColors.danger},
      {'code': 'NP', 'name': 'Nepal', 'value': 30485798, 'color': layoutColors.primaryDark},
      {'code': 'NL', 'name': 'Netherlands', 'value': 16664746, 'color': layoutColors.warning},
      {'code': 'NZ', 'name': 'New Zealand', 'value': 4414509, 'color': layoutColors.warningDark},
      {'code': 'NI', 'name': 'Nicaragua', 'value': 5869859, 'color': layoutColors.primary},
      {'code': 'NE', 'name': 'Niger', 'value': 16068994, 'color': layoutColors.danger},
      {'code': 'NG', 'name': 'Nigeria', 'value': 162470737, 'color': layoutColors.danger},
      {'code': 'NO', 'name': 'Norway', 'value': 4924848, 'color': layoutColors.warning},
      {'code': 'OM', 'name': 'Oman', 'value': 2846145, 'color': layoutColors.primaryDark},
      {'code': 'PK', 'name': 'Pakistan', 'value': 176745364, 'color': layoutColors.primaryDark},
      {'code': 'PA', 'name': 'Panama', 'value': 3571185, 'color': layoutColors.primary},
      {'code': 'PG', 'name': 'Papua New Guinea', 'value': 7013829, 'color': layoutColors.warningDark},
      {'code': 'PY', 'name': 'Paraguay', 'value': 6568290, 'color': layoutColors.success},
      {'code': 'PE', 'name': 'Peru', 'value': 29399817, 'color': layoutColors.success},
      {'code': 'PH', 'name': 'Philippines', 'value': 94852030, 'color': layoutColors.primaryDark},
      {'code': 'PL', 'name': 'Poland', 'value': 38298949, 'color': layoutColors.warning},
      {'code': 'PT', 'name': 'Portugal', 'value': 10689663, 'color': layoutColors.warning},
      {'code': 'PR', 'name': 'Puerto Rico', 'value': 3745526, 'color': layoutColors.primary},
      {'code': 'QA', 'name': 'Qatar', 'value': 1870041, 'color': layoutColors.primaryDark},
      {'code': 'RO', 'name': 'Romania', 'value': 21436495, 'color': layoutColors.warning},
      {'code': 'RU', 'name': 'Russia', 'value': 142835555, 'color': layoutColors.warning},
      {'code': 'RW', 'name': 'Rwanda', 'value': 10942950, 'color': layoutColors.danger},
      {'code': 'SA', 'name': 'Saudi Arabia', 'value': 28082541, 'color': layoutColors.primaryDark},
      {'code': 'SN', 'name': 'Senegal', 'value': 12767556, 'color': layoutColors.danger},
      {'code': 'RS', 'name': 'Serbia', 'value': 9853969, 'color': layoutColors.warning},
      {'code': 'SL', 'name': 'Sierra Leone', 'value': 5997486, 'color': layoutColors.danger},
      {'code': 'SG', 'name': 'Singapore', 'value': 5187933, 'color': layoutColors.primaryDark},
      {'code': 'SK', 'name': 'Slovak Republic', 'value': 5471502, 'color': layoutColors.warning},
      {'code': 'SI', 'name': 'Slovenia', 'value': 2035012, 'color': layoutColors.warning},
      {'code': 'SB', 'name': 'Solomon Islands', 'value': 552267, 'color': layoutColors.warningDark},
      {'code': 'SO', 'name': 'Somalia', 'value': 9556873, 'color': layoutColors.danger},
      {'code': 'ZA', 'name': 'South Africa', 'value': 50459978, 'color': layoutColors.danger},
      {'code': 'ES', 'name': 'Spain', 'value': 46454895, 'color': layoutColors.warning},
      {'code': 'LK', 'name': 'Sri Lanka', 'value': 21045394, 'color': layoutColors.primaryDark},
      {'code': 'SD', 'name': 'Sudan', 'value': 34735288, 'color': layoutColors.danger},
      {'code': 'SR', 'name': 'Suriname', 'value': 529419, 'color': layoutColors.success},
      {'code': 'SZ', 'name': 'Swaziland', 'value': 1203330, 'color': layoutColors.danger},
      {'code': 'SE', 'name': 'Sweden', 'value': 9440747, 'color': layoutColors.warning},
      {'code': 'CH', 'name': 'Switzerland', 'value': 7701690, 'color': layoutColors.warning},
      {'code': 'SY', 'name': 'Syria', 'value': 20766037, 'color': layoutColors.primaryDark},
      {'code': 'TW', 'name': 'Taiwan', 'value': 23072000, 'color': layoutColors.primaryDark},
      {'code': 'TJ', 'name': 'Tajikistan', 'value': 6976958, 'color': layoutColors.primaryDark},
      {'code': 'TZ', 'name': 'Tanzania', 'value': 46218486, 'color': layoutColors.danger},
      {'code': 'TH', 'name': 'Thailand', 'value': 69518555, 'color': layoutColors.primaryDark},
      {'code': 'TG', 'name': 'Togo', 'value': 6154813, 'color': layoutColors.danger},
      {'code': 'TT', 'name': 'Trinidad and Tobago', 'value': 1346350, 'color': layoutColors.primary},
      {'code': 'TN', 'name': 'Tunisia', 'value': 10594057, 'color': layoutColors.danger},
      {'code': 'TR', 'name': 'Turkey', 'value': 73639596, 'color': layoutColors.warning},
      {'code': 'TM', 'name': 'Turkmenistan', 'value': 5105301, 'color': layoutColors.primaryDark},
      {'code': 'UG', 'name': 'Uganda', 'value': 34509205, 'color': layoutColors.danger},
      {'code': 'UA', 'name': 'Ukraine', 'value': 45190180, 'color': layoutColors.warning},
      {'code': 'AE', 'name': 'United Arab Emirates', 'value': 7890924, 'color': layoutColors.primaryDark},
      {'code': 'GB', 'name': 'United Kingdom', 'value': 62417431, 'color': layoutColors.warning},
      {'code': 'US', 'name': 'United States', 'value': 313085380, 'color': layoutColors.primary},
      {'code': 'UY', 'name': 'Uruguay', 'value': 3380008, 'color': layoutColors.success},
      {'code': 'UZ', 'name': 'Uzbekistan', 'value': 27760267, 'color': layoutColors.primaryDark},
      {'code': 'VE', 'name': 'Venezuela', 'value': 29436891, 'color': layoutColors.success},
      {'code': 'PS', 'name': 'West Bank and Gaza', 'value': 4152369, 'color': layoutColors.primaryDark},
      {'code': 'VN', 'name': 'Vietnam', 'value': 88791996, 'color': layoutColors.primaryDark},
      {'code': 'YE', 'name': 'Yemen, Rep.', 'value': 24799880, 'color': layoutColors.primaryDark},
      {'code': 'ZM', 'name': 'Zambia', 'value': 13474959, 'color': layoutColors.danger},
      {'code': 'ZW', 'name': 'Zimbabwe', 'value': 12754378, 'color': layoutColors.danger}
    ];

    

    for (var i = 0; i < mapData.length; i++) {
            var obj = mapData[i];
            if(obj.code === key && key!= ""){
              var data = {}; 
              data['code'] = key;
              data['name'] = obj.name;
              data['value'] = value;
              data['color'] = obj.color;
              return data;
            }
           
        }
        
       

}


transformationLocation(mapdata,self){
   self.inputdata = mapdata;
   self.chartData = self.getDataWithParam(self.inputdata);
   let chart = AmCharts.makeChart(this._selector.nativeElement, self.chartData);
}
transformationHashTag(result,self){
  self.cloudData = result;
}

transformationDateDropdown(result,self){
    var sampleObject =[];
    result.forEach(function(element){
      var sO={
        name: element,
        date: element
      };
      sampleObject.push(sO);
    });
    

    self.dropDownDate = sampleObject;

}



transformationChannalDropdown(result,self){
    var sampleObject =[];
    var c_name;
    result.forEach(function(element){
      

      if(element ==='reddit'){ c_name ='Reddit'; }
      if(element ==='facebook'){ c_name ='Facebook'; }
      if(element ==='tumblr'){ c_name ='Tumblr'; }
      if(element ==='flickr'){ c_name ='Flickr'; }
      if(element ==='news'){ c_name ='News'; }
      if(element ==='all_media_stat'){ c_name ='All'; }
      if(element ==='twitter'){ c_name ='Twitter'; }
      if(element ==='Plus'){ c_name ='Plus'; }
      if(element ==='blogs'){ c_name ='Blogs'; }
     
      
      var sO={
        name: c_name,
        channel: element
      };
      sampleObject.push(sO);
    });
    

    self.dropDownChannel = sampleObject;
}



transformationBrandDropdown(result,self){
    var sampleObject =[];
    result.forEach(function(element){
      var sO={
        name: element,
        brand: element
      };
      sampleObject.push(sO);
    });
   

    self.dropDownBrand = sampleObject;
}

// mentionChart
transformationmentionsChart(result,self){
    self.simpleBarData= result;

    self.simpleBarOptions= {
      fullWidth: true,
      height: '400px',
      horizontalBars: true,
      //chartPadding: 60,
      showLabel: true,
     
  axisX: {
    showGrid: true,
    showLabel: true,
    offset: 0
  },

  axisY: {
    offset: 110,
   
  },    
    };

  }


  transformationdomainChart(result,self){
    self.domainBarData= result;

    self.domianBarOptions= {
      fullWidth: true,
      height: '400px',
      horizontalBars: true,
      //chartPadding: 60,
      showLabel: true,
     
  axisX: {
    showGrid: true,
    showLabel: true,
    offset: 0
  },

  axisY: {
    offset: 100,
   
  },    
    };

  }






transformationsentimentsChart(result,self){
    self.simpleDonutData= result;

   self.simpleDonutOptions = {
      fullWidth: true,
      donut: true,
      height: '300px',
      weight: '300px',
      labelDirection: 'explode',
      labelInterpolationFnc: function (value) {
        return value[0];
      }
    }
}



transformationuserclassChart(result,self){
    self.labelsPieData= result;
    self.labelsPieOptions = {
      fullWidth: true,
      height: '300px',
      weight: '300px',
      labelDirection: 'explode',
      labelOffset: 80,
      // chartPadding: 50,
      labelInterpolationFnc: function (value) {
        return value;
      }
    }
}


transformationttopusersChart(result,self){
    self.simplePieData= result;
 
    self.simplePieOptions = {
      fullWidth: true,
      height: '300px',
      weight: '300px',
      labelInterpolationFnc: function (value) {
        return Math.round(value / 12 * 100) + '%';
      }
    }

  }


makeHasTagInput(result){
  
  var cloud =[];
for (var i = 0; i < 10; i++) { 
  var data_lb = result[i];
  
    cloud.push(data_lb);
}
return cloud;
}

makeReachInput(result){
  
  var cloud =[];
for (var i = 0; i < 20; i++) { 
  var data_lb = result[i];
  
    cloud.push(data_lb);
}
return cloud;
}

transformationtotaltweets(result,self){
    self.totalimpact= result;
}

transformationtotalreach(result, self){
    self.totalreach= result;
 

}

transformationtotalengagement(result, self){
    self.totalarticlesengagement= result;
 

}


transformationtotalarticles(result, self){
    self.totalarticlecount= result;
}

transformationilabel(result, self){
    self.ilabel= result;
}
transformationrlabel(result, self){
    self.rlabel= result;
}
       








getDataWithParam(mapdata,self){

  
   let layoutColors = this._baConfig.get().colors;
   let latlong = {};
    latlong['AD'] = {'latitude': 42.5, 'longitude': 1.5};
    latlong['AE'] = {'latitude': 24, 'longitude': 54};
    latlong['AF'] = {'latitude': 33, 'longitude': 65};
    latlong['AG'] = {'latitude': 17.05, 'longitude': -61.8};
    latlong['AI'] = {'latitude': 18.25, 'longitude': -63.1667};
    latlong['AL'] = {'latitude': 41, 'longitude': 20};
    latlong['AM'] = {'latitude': 40, 'longitude': 45};
    latlong['AN'] = {'latitude': 12.25, 'longitude': -68.75};
    latlong['AO'] = {'latitude': -12.5, 'longitude': 18.5};
    latlong['AP'] = {'latitude': 35, 'longitude': 105};
    latlong['AQ'] = {'latitude': -90, 'longitude': 0};
    latlong['AR'] = {'latitude': -34, 'longitude': -64};
    latlong['AS'] = {'latitude': -14.3333, 'longitude': -170};
    latlong['AT'] = {'latitude': 47.3333, 'longitude': 13.3333};
    latlong['AU'] = {'latitude': -27, 'longitude': 133};
    latlong['AW'] = {'latitude': 12.5, 'longitude': -69.9667};
    latlong['AZ'] = {'latitude': 40.5, 'longitude': 47.5};
    latlong['BA'] = {'latitude': 44, 'longitude': 18};
    latlong['BB'] = {'latitude': 13.1667, 'longitude': -59.5333};
    latlong['BD'] = {'latitude': 24, 'longitude': 90};
    latlong['BE'] = {'latitude': 50.8333, 'longitude': 4};
    latlong['BF'] = {'latitude': 13, 'longitude': -2};
    latlong['BG'] = {'latitude': 43, 'longitude': 25};
    latlong['BH'] = {'latitude': 26, 'longitude': 50.55};
    latlong['BI'] = {'latitude': -3.5, 'longitude': 30};
    latlong['BJ'] = {'latitude': 9.5, 'longitude': 2.25};
    latlong['BM'] = {'latitude': 32.3333, 'longitude': -64.75};
    latlong['BN'] = {'latitude': 4.5, 'longitude': 114.6667};
    latlong['BO'] = {'latitude': -17, 'longitude': -65};
    latlong['BR'] = {'latitude': -10, 'longitude': -55};
    latlong['BS'] = {'latitude': 24.25, 'longitude': -76};
    latlong['BT'] = {'latitude': 27.5, 'longitude': 90.5};
    latlong['BV'] = {'latitude': -54.4333, 'longitude': 3.4};
    latlong['BW'] = {'latitude': -22, 'longitude': 24};
    latlong['BY'] = {'latitude': 53, 'longitude': 28};
    latlong['BZ'] = {'latitude': 17.25, 'longitude': -88.75};
    latlong['CA'] = {'latitude': 54, 'longitude': -100};
    latlong['CC'] = {'latitude': -12.5, 'longitude': 96.8333};
    latlong['CD'] = {'latitude': 0, 'longitude': 25};
    latlong['CF'] = {'latitude': 7, 'longitude': 21};
    latlong['CG'] = {'latitude': -1, 'longitude': 15};
    latlong['CH'] = {'latitude': 47, 'longitude': 8};
    latlong['CI'] = {'latitude': 8, 'longitude': -5};
    latlong['CK'] = {'latitude': -21.2333, 'longitude': -159.7667};
    latlong['CL'] = {'latitude': -30, 'longitude': -71};
    latlong['CM'] = {'latitude': 6, 'longitude': 12};
    latlong['CN'] = {'latitude': 35, 'longitude': 105};
    latlong['CO'] = {'latitude': 4, 'longitude': -72};
    latlong['CR'] = {'latitude': 10, 'longitude': -84};
    latlong['CU'] = {'latitude': 21.5, 'longitude': -80};
    latlong['CV'] = {'latitude': 16, 'longitude': -24};
    latlong['CX'] = {'latitude': -10.5, 'longitude': 105.6667};
    latlong['CY'] = {'latitude': 35, 'longitude': 33};
    latlong['CZ'] = {'latitude': 49.75, 'longitude': 15.5};
    latlong['DE'] = {'latitude': 51, 'longitude': 9};
    latlong['DJ'] = {'latitude': 11.5, 'longitude': 43};
    latlong['DK'] = {'latitude': 56, 'longitude': 10};
    latlong['DM'] = {'latitude': 15.4167, 'longitude': -61.3333};
    latlong['DO'] = {'latitude': 19, 'longitude': -70.6667};
    latlong['DZ'] = {'latitude': 28, 'longitude': 3};
    latlong['EC'] = {'latitude': -2, 'longitude': -77.5};
    latlong['EE'] = {'latitude': 59, 'longitude': 26};
    latlong['EG'] = {'latitude': 27, 'longitude': 30};
    latlong['EH'] = {'latitude': 24.5, 'longitude': -13};
    latlong['ER'] = {'latitude': 15, 'longitude': 39};
    latlong['ES'] = {'latitude': 40, 'longitude': -4};
    latlong['ET'] = {'latitude': 8, 'longitude': 38};
    latlong['EU'] = {'latitude': 47, 'longitude': 8};
    latlong['FI'] = {'latitude': 62, 'longitude': 26};
    latlong['FJ'] = {'latitude': -18, 'longitude': 175};
    latlong['FK'] = {'latitude': -51.75, 'longitude': -59};
    latlong['FM'] = {'latitude': 6.9167, 'longitude': 158.25};
    latlong['FO'] = {'latitude': 62, 'longitude': -7};
    latlong['FR'] = {'latitude': 46, 'longitude': 2};
    latlong['GA'] = {'latitude': -1, 'longitude': 11.75};
    latlong['GB'] = {'latitude': 54, 'longitude': -2};
    latlong['GD'] = {'latitude': 12.1167, 'longitude': -61.6667};
    latlong['GE'] = {'latitude': 42, 'longitude': 43.5};
    latlong['GF'] = {'latitude': 4, 'longitude': -53};
    latlong['GH'] = {'latitude': 8, 'longitude': -2};
    latlong['GI'] = {'latitude': 36.1833, 'longitude': -5.3667};
    latlong['GL'] = {'latitude': 72, 'longitude': -40};
    latlong['GM'] = {'latitude': 13.4667, 'longitude': -16.5667};
    latlong['GN'] = {'latitude': 11, 'longitude': -10};
    latlong['GP'] = {'latitude': 16.25, 'longitude': -61.5833};
    latlong['GQ'] = {'latitude': 2, 'longitude': 10};
    latlong['GR'] = {'latitude': 39, 'longitude': 22};
    latlong['GS'] = {'latitude': -54.5, 'longitude': -37};
    latlong['GT'] = {'latitude': 15.5, 'longitude': -90.25};
    latlong['GU'] = {'latitude': 13.4667, 'longitude': 144.7833};
    latlong['GW'] = {'latitude': 12, 'longitude': -15};
    latlong['GY'] = {'latitude': 5, 'longitude': -59};
    latlong['HK'] = {'latitude': 22.25, 'longitude': 114.1667};
    latlong['HM'] = {'latitude': -53.1, 'longitude': 72.5167};
    latlong['HN'] = {'latitude': 15, 'longitude': -86.5};
    latlong['HR'] = {'latitude': 45.1667, 'longitude': 15.5};
    latlong['HT'] = {'latitude': 19, 'longitude': -72.4167};
    latlong['HU'] = {'latitude': 47, 'longitude': 20};
    latlong['ID'] = {'latitude': -5, 'longitude': 120};
    latlong['IE'] = {'latitude': 53, 'longitude': -8};
    latlong['IL'] = {'latitude': 31.5, 'longitude': 34.75};
    latlong['IN'] = {'latitude': 20, 'longitude': 77};
    latlong['IO'] = {'latitude': -6, 'longitude': 71.5};
    latlong['IQ'] = {'latitude': 33, 'longitude': 44};
    latlong['IR'] = {'latitude': 32, 'longitude': 53};
    latlong['IS'] = {'latitude': 65, 'longitude': -18};
    latlong['IT'] = {'latitude': 42.8333, 'longitude': 12.8333};
    latlong['JM'] = {'latitude': 18.25, 'longitude': -77.5};
    latlong['JO'] = {'latitude': 31, 'longitude': 36};
    latlong['JP'] = {'latitude': 36, 'longitude': 138};
    latlong['KE'] = {'latitude': 1, 'longitude': 38};
    latlong['KG'] = {'latitude': 41, 'longitude': 75};
    latlong['KH'] = {'latitude': 13, 'longitude': 105};
    latlong['KI'] = {'latitude': 1.4167, 'longitude': 173};
    latlong['KM'] = {'latitude': -12.1667, 'longitude': 44.25};
    latlong['KN'] = {'latitude': 17.3333, 'longitude': -62.75};
    latlong['KP'] = {'latitude': 40, 'longitude': 127};
    latlong['KR'] = {'latitude': 37, 'longitude': 127.5};
    latlong['KW'] = {'latitude': 29.3375, 'longitude': 47.6581};
    latlong['KY'] = {'latitude': 19.5, 'longitude': -80.5};
    latlong['KZ'] = {'latitude': 48, 'longitude': 68};
    latlong['LA'] = {'latitude': 18, 'longitude': 105};
    latlong['LB'] = {'latitude': 33.8333, 'longitude': 35.8333};
    latlong['LC'] = {'latitude': 13.8833, 'longitude': -61.1333};
    latlong['LI'] = {'latitude': 47.1667, 'longitude': 9.5333};
    latlong['LK'] = {'latitude': 7, 'longitude': 81};
    latlong['LR'] = {'latitude': 6.5, 'longitude': -9.5};
    latlong['LS'] = {'latitude': -29.5, 'longitude': 28.5};
    latlong['LT'] = {'latitude': 55, 'longitude': 24};
    latlong['LU'] = {'latitude': 49.75, 'longitude': 6};
    latlong['LV'] = {'latitude': 57, 'longitude': 25};
    latlong['LY'] = {'latitude': 25, 'longitude': 17};
    latlong['MA'] = {'latitude': 32, 'longitude': -5};
    latlong['MC'] = {'latitude': 43.7333, 'longitude': 7.4};
    latlong['MD'] = {'latitude': 47, 'longitude': 29};
    latlong['ME'] = {'latitude': 42.5, 'longitude': 19.4};
    latlong['MG'] = {'latitude': -20, 'longitude': 47};
    latlong['MH'] = {'latitude': 9, 'longitude': 168};
    latlong['MK'] = {'latitude': 41.8333, 'longitude': 22};
    latlong['ML'] = {'latitude': 17, 'longitude': -4};
    latlong['MM'] = {'latitude': 22, 'longitude': 98};
    latlong['MN'] = {'latitude': 46, 'longitude': 105};
    latlong['MO'] = {'latitude': 22.1667, 'longitude': 113.55};
    latlong['MP'] = {'latitude': 15.2, 'longitude': 145.75};
    latlong['MQ'] = {'latitude': 14.6667, 'longitude': -61};
    latlong['MR'] = {'latitude': 20, 'longitude': -12};
    latlong['MS'] = {'latitude': 16.75, 'longitude': -62.2};
    latlong['MT'] = {'latitude': 35.8333, 'longitude': 14.5833};
    latlong['MU'] = {'latitude': -20.2833, 'longitude': 57.55};
    latlong['MV'] = {'latitude': 3.25, 'longitude': 73};
    latlong['MW'] = {'latitude': -13.5, 'longitude': 34};
    latlong['MX'] = {'latitude': 23, 'longitude': -102};
    latlong['MY'] = {'latitude': 2.5, 'longitude': 112.5};
    latlong['MZ'] = {'latitude': -18.25, 'longitude': 35};
    latlong['NA'] = {'latitude': -22, 'longitude': 17};
    latlong['NC'] = {'latitude': -21.5, 'longitude': 165.5};
    latlong['NE'] = {'latitude': 16, 'longitude': 8};
    latlong['NF'] = {'latitude': -29.0333, 'longitude': 167.95};
    latlong['NG'] = {'latitude': 10, 'longitude': 8};
    latlong['NI'] = {'latitude': 13, 'longitude': -85};
    latlong['NL'] = {'latitude': 52.5, 'longitude': 5.75};
    latlong['NO'] = {'latitude': 62, 'longitude': 10};
    latlong['NP'] = {'latitude': 28, 'longitude': 84};
    latlong['NR'] = {'latitude': -0.5333, 'longitude': 166.9167};
    latlong['NU'] = {'latitude': -19.0333, 'longitude': -169.8667};
    latlong['NZ'] = {'latitude': -41, 'longitude': 174};
    latlong['OM'] = {'latitude': 21, 'longitude': 57};
    latlong['PA'] = {'latitude': 9, 'longitude': -80};
    latlong['PE'] = {'latitude': -10, 'longitude': -76};
    latlong['PF'] = {'latitude': -15, 'longitude': -140};
    latlong['PG'] = {'latitude': -6, 'longitude': 147};
    latlong['PH'] = {'latitude': 13, 'longitude': 122};
    latlong['PK'] = {'latitude': 30, 'longitude': 70};
    latlong['PL'] = {'latitude': 52, 'longitude': 20};
    latlong['PM'] = {'latitude': 46.8333, 'longitude': -56.3333};
    latlong['PR'] = {'latitude': 18.25, 'longitude': -66.5};
    latlong['PS'] = {'latitude': 32, 'longitude': 35.25};
    latlong['PT'] = {'latitude': 39.5, 'longitude': -8};
    latlong['PW'] = {'latitude': 7.5, 'longitude': 134.5};
    latlong['PY'] = {'latitude': -23, 'longitude': -58};
    latlong['QA'] = {'latitude': 25.5, 'longitude': 51.25};
    latlong['RE'] = {'latitude': -21.1, 'longitude': 55.6};
    latlong['RO'] = {'latitude': 46, 'longitude': 25};
    latlong['RS'] = {'latitude': 44, 'longitude': 21};
    latlong['RU'] = {'latitude': 60, 'longitude': 100};
    latlong['RW'] = {'latitude': -2, 'longitude': 30};
    latlong['SA'] = {'latitude': 25, 'longitude': 45};
    latlong['SB'] = {'latitude': -8, 'longitude': 159};
    latlong['SC'] = {'latitude': -4.5833, 'longitude': 55.6667};
    latlong['SD'] = {'latitude': 15, 'longitude': 30};
    latlong['SE'] = {'latitude': 62, 'longitude': 15};
    latlong['SG'] = {'latitude': 1.3667, 'longitude': 103.8};
    latlong['SH'] = {'latitude': -15.9333, 'longitude': -5.7};
    latlong['SI'] = {'latitude': 46, 'longitude': 15};
    latlong['SJ'] = {'latitude': 78, 'longitude': 20};
    latlong['SK'] = {'latitude': 48.6667, 'longitude': 19.5};
    latlong['SL'] = {'latitude': 8.5, 'longitude': -11.5};
    latlong['SM'] = {'latitude': 43.7667, 'longitude': 12.4167};
    latlong['SN'] = {'latitude': 14, 'longitude': -14};
    latlong['SO'] = {'latitude': 10, 'longitude': 49};
    latlong['SR'] = {'latitude': 4, 'longitude': -56};
    latlong['ST'] = {'latitude': 1, 'longitude': 7};
    latlong['SV'] = {'latitude': 13.8333, 'longitude': -88.9167};
    latlong['SY'] = {'latitude': 35, 'longitude': 38};
    latlong['SZ'] = {'latitude': -26.5, 'longitude': 31.5};
    latlong['TC'] = {'latitude': 21.75, 'longitude': -71.5833};
    latlong['TD'] = {'latitude': 15, 'longitude': 19};
    latlong['TF'] = {'latitude': -43, 'longitude': 67};
    latlong['TG'] = {'latitude': 8, 'longitude': 1.1667};
    latlong['TH'] = {'latitude': 15, 'longitude': 100};
    latlong['TJ'] = {'latitude': 39, 'longitude': 71};
    latlong['TK'] = {'latitude': -9, 'longitude': -172};
    latlong['TM'] = {'latitude': 40, 'longitude': 60};
    latlong['TN'] = {'latitude': 34, 'longitude': 9};
    latlong['TO'] = {'latitude': -20, 'longitude': -175};
    latlong['TR'] = {'latitude': 39, 'longitude': 35};
    latlong['TT'] = {'latitude': 11, 'longitude': -61};
    latlong['TV'] = {'latitude': -8, 'longitude': 178};
    latlong['TW'] = {'latitude': 23.5, 'longitude': 121};
    latlong['TZ'] = {'latitude': -6, 'longitude': 35};
    latlong['UA'] = {'latitude': 49, 'longitude': 32};
    latlong['UG'] = {'latitude': 1, 'longitude': 32};
    latlong['UM'] = {'latitude': 19.2833, 'longitude': 166.6};
    latlong['US'] = {'latitude': 38, 'longitude': -97};
    latlong['UY'] = {'latitude': -33, 'longitude': -56};
    latlong['UZ'] = {'latitude': 41, 'longitude': 64};
    latlong['VA'] = {'latitude': 41.9, 'longitude': 12.45};
    latlong['VC'] = {'latitude': 13.25, 'longitude': -61.2};
    latlong['VE'] = {'latitude': 8, 'longitude': -66};
    latlong['VG'] = {'latitude': 18.5, 'longitude': -64.5};
    latlong['VI'] = {'latitude': 18.3333, 'longitude': -64.8333};
    latlong['VN'] = {'latitude': 16, 'longitude': 106};
    latlong['VU'] = {'latitude': -16, 'longitude': 167};
    latlong['WF'] = {'latitude': -13.3, 'longitude': -176.2};
    latlong['WS'] = {'latitude': -13.5833, 'longitude': -172.3333};
    latlong['YE'] = {'latitude': 15, 'longitude': 48};
    latlong['YT'] = {'latitude': -12.8333, 'longitude': 45.1667};
    latlong['ZA'] = {'latitude': -29, 'longitude': 24};
    latlong['ZM'] = {'latitude': -15, 'longitude': 30};
    latlong['ZW'] = {'latitude': -20, 'longitude': 30};
   
    let oldData = mapdata;
    let mapData= []
    for (var key in oldData) {
        if (oldData[key] === "" || oldData[key] === null || oldData[key] === undefined){
          delete oldData[key];
          
        }else{
          mapData.push(oldData[key]);
            
        }
    }
   
    //console.log(JSON.stringify(mapData));
    let minBulletSize = 3
      , maxBulletSize = 70
      , min = Infinity
      , max = -Infinity;

    // get min and max values
    for (let i = 0; i < mapData.length; i++) {
      
      var value = mapData[i].value;
      if (value < min) {
        min = value;
      }
      if (value > max) {
        max = value;
      }
    

    }


    let dataProvider = {
      mapVar: AmCharts.maps.worldLow,
      images: []
    };

    var maxSquare = maxBulletSize * maxBulletSize * 2 * Math.PI;
    var minSquare = minBulletSize * minBulletSize * 2 * Math.PI;

    // create circle for each country
    for (let i = 0; i < mapData.length; i++) {
      let dataItem = mapData[i];
      let value = dataItem.value;
      // calculate size of a bubble
      let square = (value - min) / (max - min) * (maxSquare - minSquare) + minSquare;
      if (square < minSquare) {
        square = minSquare;
      }
      let size = Math.sqrt(square / (Math.PI * 2));
      let id = dataItem.code;



      dataProvider.images.push({
        type: 'circle',
        width: size,
        height: size,
        color: dataItem.color,
        longitude: latlong[id].longitude,
        latitude: latlong[id].latitude,
        title: dataItem.name,
        value: value
      });
    }

    return {
      type: 'map',
      theme: 'blur',
      titles: [
        {text: 'Reach around the world', size: 14},
        {text: 'source: Twitter', size: 11}
      ],
      dataProvider: dataProvider,

      areasSettings: {
        unlistedAreasColor: '#000000',
        unlistedAreasAlpha: 0.1
      },

      imagesSettings: {
        balloonText: '<span style="font-size:14px;"><b>[[title]]</b>: [[value]]</span>'
      },

      export: {
        enabled: true
      },
      pathToImages: layoutPaths.images.amMap
    };
}


}



 