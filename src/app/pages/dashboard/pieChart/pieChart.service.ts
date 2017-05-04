import {Injectable} from '@angular/core';
import {BaThemeConfigProvider, colorHelper} from '../../../theme';
import {HttpServices} from "../../../shared/services/httpservice";

@Injectable()
export class PieChartService {

  private totalimpact =0;

  constructor(private _baConfig:BaThemeConfigProvider, private _httpService: HttpServices) {
  }



  ngOnInit() {

        let self = this;


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
  

ProcessTwitt_Data(data2,self){
    self.totalimpact = data2.impact_score;
    self.totalreach = data2.reach;
}


transformationtotaltweets(result,self){
    self.totalimpact= result;
}

transformationtotalreach(result, self){
    self.totalreach= result;
    console.log(self.totalreach);
}



  getData() {
    let pieColor = this._baConfig.get().colors.custom.dashboardPieChart;
    return [
      {
       color: pieColor,
       description: 'Total Tweets',
       stats: '32,592',
       icon: 'tweets',
       image:  'uparrow',
       change: '5%',
     },
      {
       color: pieColor,
       description: 'Total Engagement',
       stats: '178,391',
       icon: 'face',
       image:  'uparrow',
       change: '0.25%',
     },
     {
       color: pieColor,
       description: 'Engaged Users',
       stats: '57,820',
       icon: 'person',
           image:  'uparrow',
             change: '0.25%',
     }, 
     {
       color: pieColor,
       description: 'Total Reach',
       stats: '30000',
       icon: 'reach',
       image:  'downarrow',
         change: '25%',
      },
     {
       color: pieColor,
       description: 'Impact Score',
       stats: ' 89,745',
       icon: 'impact',
       change: '25%',
        image:  'uparrow',
     } ,
     {
       color: pieColor,
       description: 'Favorite Counts',
       stats: ' 89,745',
       icon: 'favorite',
       image:  'downarrow',
         change: '0.25%',
     } ,
     {
       color: pieColor,
       description: 'Retweets Counts',
       stats: ' 89,745',
       icon: 'refresh',
       change: '10%',
           image:  'uparrow',
           
     },
     {
       color: pieColor,
       description: 'Total Hashtags',
       stats: ' 89,745',
       icon: 'tag',
         image:  'downarrow',
           change: '0.25%',
     }
   ];
 }
}
 
