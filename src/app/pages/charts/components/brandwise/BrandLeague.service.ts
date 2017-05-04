import {Injectable} from '@angular/core';

import {BaThemeConfigProvider} from '../../../../theme';

@Injectable()
export class BrandLeagueService {

  private _data = {
       simplePieData: {
      labels: ['<100', '100-1k', '1k-10k', '10k>'],
      series: [12,12,21,3]
    },
    simplePieOptions: {
      fullWidth: true,
      height: '300px',
      weight: '300px',
      labelInterpolationFnc: function (value) {
        return Math.round(value / 12 * 100) + '%';
      }
    },
         scatterChartOptions :{
    chartType: 'ScatterChart',
    dataTable: [
      ['Age', 'Weight'],
      [ 8,      12],
      [ 4,      5.5],
      [ 11,     14],
      [ 4,      5],
      [ 3,      3.5],
      [ 6.5,    7]
    ],
    options: {
      title: 'HasTag  and Count',
      hAxis: {title: 'HashTag'},
      vAxis: {title: 'Count'},
      legend: 'none'
    }
},


    labelsPieData: {
      labels: ['fr', 'en', 'pt', 'tl', 'ja', 'es'],
      series: [3, 34, 1, 2, 14, 1]
    },
    labelsPieOptions: {
      fullWidth: true,
      height: '300px',
      weight: '300px',
      labelDirection: 'explode',
      labelInterpolationFnc: function (value) {
        return value;
      }
    },
    simpleDonutData: {
      labels: ['neutral', 'positive', 'negative'],
      series: [20, 34, 5]
    },
    simpleDonutOptions: {
      fullWidth: true,
      donut: true,
      height: '100px',
      weight: '100px',
      labelDirection: 'explode',
      labelInterpolationFnc: function (value) {
        return value[0];
      }
    },
    simpleLineOptions: {
      color: this._baConfig.get().colors.defaultText,
      fullWidth: true,
      height: '300px',
      chartPadding: {
        right: 40
      }
    },
    simpleLineData: {
      labels: ['2016-11-09', '2016-11-10', '2016-11-11', '2016-11-12', '2016-11-13', '2016-11-14'],
      series: [
        [173, 127, 54, 176, 117 ,187],
        [48, 52, 39, 93, 54, 55],
        [53, 46, 9, 33, 43, 76]
      ]
    },
    areaLineData: {
      labels: [1, 2, 3, 4, 5, 6, 7, 8],
      series: [
        [5, 9, 7, 8, 5, 3, 5, 4]
      ]
    },
    areaLineOptions: {
      fullWidth: true,
      height: '300px',
      low: 0,
      showArea: true
    },
    biLineData: {
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      series: [
        [1, 2, 3, 1, -2, 0, 1],
        [-2, -1, -2, -1, -2.5, -1, -2],
        [0, 0, 0, 1, 2, 2.5, 2],
        [2.5, 2, 1, 0.5, 1, 0.5, -1]
      ]
    },

    biLineOptions: {
      height: '300px',
      high: 3,
      low: -3,
      showArea: true,
      showLine: false,
      showPoint: false,
      fullWidth: true,
      axisX: {
        showGrid: false
      }
    },
    // simpleBarData: {
    //   labels: ['@iptl', '@IndianAces', '@rogerfederer', '@naterzzzz', '@geniebouchard', '@IPTL', '@jakedavi5', '@MattBarbarin', '@MirzaSania', '@hotdog6969'],
    //   series: [
    //     [4, 2, 2, 1, 1, 1, 1,1, 1,1]
        
    //   ]
    // },
    // simpleBarOptions: {
    //   fullWidth: true,
    //   height: '300px'
    // },
    multiBarData: {
      labels: ['Quarter 1', 'Quarter 2', 'Quarter 3', 'Quarter 4'],
      series: [
        [5, 4, 3, 7],
        [3, 2, 9, 5],
        [1, 5, 8, 4],
        [2, 3, 4, 6],
        [4, 1, 2, 1]
      ]
    },
    multiBarOptions: {
      fullWidth: true,
      height: '300px',
      stackBars: true,
      axisX: {
        labelInterpolationFnc: function (value) {
          return value.split(/\s+/).map(function (word) {
            return word[0];
          }).join('');
        }
      },
      axisY: {
        offset: 20
      }
    },
    multiBarResponsive: [
      ['screen and (min-width: 400px)', {
        reverseData: true,
        horizontalBars: true,
        axisX: {
          labelInterpolationFnc: (n) => n
        },
        axisY: {
          offset: 60
        }
      }],
      ['screen and (min-width: 700px)', {
        stackBars: false,
        reverseData: false,
        horizontalBars: false,
        seriesBarDistance: 15
      }]
    ],
    stackedBarData: {
      labels: ['Quarter 1', 'Quarter 2', 'Quarter 3', 'Quarter 4'],
      series: [
        [800000, 1200000, 1400000, 1300000],
        [200000, 400000, 500000, 300000],
        [100000, 200000, 400000, 600000]
      ]
    },
    stackedBarOptions: {
      fullWidth: true,
      height: '300px',
      stackBars: true,
      axisY: {
        labelInterpolationFnc: function (value) {
          return (value / 1000) + 'k';
        }
      }
    }
 
  };

  constructor(private _baConfig:BaThemeConfigProvider) {
  }

  public getAll() {
    return this._data;
  }

  public getResponsive(padding, offset) {
    return [
      ['screen and (min-width: 1550px)', {
        chartPadding: padding,
        labelOffset: offset,
        labelDirection: 'explode',
        labelInterpolationFnc: function (value) {
          return value;
        }
      }],
      ['screen and (max-width: 1200px)', {
        chartPadding: padding,
        labelOffset: offset,
        labelDirection: 'explode',
        labelInterpolationFnc: function (value) {
          return value;
        }
      }],
      ['screen and (max-width: 600px)', {
        chartPadding: 0,
        labelOffset: 0,
        
        labelInterpolationFnc: function (value) {
          return value[0];
        }
      }]
    ];
  }
}