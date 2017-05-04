import { Injectable } from '@angular/core';

@Injectable()
export class BasicTablesService {

  smartTablePageSize = 10;

  smartTableData = [
    {
      id: 1,
      brand: 'Coke',
      asset: 'LED',
      tagline: 'Taste it',
      email: 'mdo@gmail.com',
      age: '28'
    },
    {
      id: 2,
      brand: 'Coke',
      asset: 'Apparels',
      tagline: 'Coca-cola',
      email: 'mdo@gmail.com',
      age: '28'
    },
    {
      id: 3,
      brand: 'Paytm',
      asset: 'Stumps',
      tagline: 'Transfer Money',
      email: 'mdo@gmail.com',
      age: '28'
    },
    {
      id: 4,
      brand: 'Paytm',
      asset: 'LED',
      tagline: 'Taste it',
      email: 'mdo@gmail.com',
      age: '28'
    },
      {
      id: 5,
      brand: 'Kajaria',
      asset: 'LED',
      tagline: 'Cement pe jaan hai',
      email: 'mdo@gmail.com',
      age: '28'
    },
    {
      id: 6,
      brand: 'MRF',
      asset: 'BAT',
      tagline: 'Best Tyres',
      email: 'mdo@gmail.com',
      age: '28'
    },
    {
      id: 7,
      firstName: 'Barbara',
      lastName: 'Black',
      username: '@barbara',
      email: 'barbara@yandex.ru',
      age: '43'
    },
    {
      id: 8,
      firstName: 'Sevan',
      lastName: 'Bagrat',
      username: '@sevan',
      email: 'sevan@outlook.com',
      age: '13'
    },
    {
      id: 9,
      firstName: 'Ruben',
      lastName: 'Vardan',
      username: '@ruben',
      email: 'ruben@gmail.com',
      age: '22'
    },
    {
      id: 10,
      firstName: 'Karen',
      lastName: 'Sevan',
      username: '@karen',
      email: 'karen@yandex.ru',
      age: '33'
    },
    {
      id: 11,
      firstName: 'Mark',
      lastName: 'Otto',
      username: '@mark',
      email: 'mark@gmail.com',
      age: '38'
    }

  ];

  editableTableData: Array<any>;

  peopleTableData = [
    {
      id: 1,
      RequestDate: '26/01/2016',
      sport: 'Cricket',
      clientname: 'Mark',
      username: '@mdo',
      tournament: 'Ipl',
      round: 'First',
      match: 'IND Vs PAK',
      server: 'FTP', 
      host: '127.168.10.7',
      port: '3000',
      email: 'mdo@gmail.com',
      password: 'live123', 
      status: 'info'
    },
    {
      id: 2,
      RequestDate: '23/01/2016',
      sport: 'Cricket',
      clientname: 'Mark',
      username: '@mdo',
      tournament: 'Ipl',
      round: 'First',
      match: 'ENG Vs PAK',
      server: 'FTP', 
      host: '127.168.10.7',
      port: '3000',
      email: 'mdo@gmail.com',
      password: 'live123', 
      status: 'info'
    },
       {
      id: 3,
      RequestDate: '22/01/2016',
      sport: 'Cricket',
      clientname: 'Mark',
      username: '@mdo',
      tournament: 'Ipl',
      round: 'Second',
      match: 'IND Vs AUS',
      server: 'SFTP', 
      host: '127.168.10.7',
      port: '3000',
      email: 'mdo@gmail.com',
      password: 'live123', 
      status: 'info'
    },
    {
      id: 4,
      RequestDate: '20/01/2016',
      sport: 'Tennis',
      clientname: 'Nick',
      username: '@Nickdo',
      tournament: 'Iptl',
      round: 'First',
      match: 'IND Vs PAK',
      server: 'FTP', 
      host: '127.168.10.8',
      port: '3004',
      email: 'mdo@gmail.com',
      password: 'Nick456', 
      status: 'info'
    },
    {
      id: 5,
      RequestDate: '19/01/2016',
      sport: 'AFL',
      clientname: 'Nick',
      username: '@Nickdo',
      tournament: 'Ipl',
      round: 'Second',
      match: 'IND Vs PAK',
      server: 'SFTP', 
      host: '127.168.10.8',
      port: '3004',
      email: 'mdo@gmail.com',
      password: 'Nick456', 
      status: 'info'
    },
  ];

  metricsTableData = [
    {
      image: 'app/browsers/chrome.svg',
      browser: 'Google Chrome',
      visits: '10,392',
      isVisitsUp: true,
      purchases: '4,214',
      isPurchasesUp: true,
      percent: '45%',
      isPercentUp: true
    },
    {
      image: 'app/browsers/firefox.svg',
      browser: 'Mozilla Firefox',
      visits: '7,873',
      isVisitsUp: true,
      purchases: '3,031',
      isPurchasesUp: false,
      percent: '28%',
      isPercentUp: true
    },
    {
      image: 'app/browsers/ie.svg',
      browser: 'Internet Explorer',
      visits: '5,890',
      isVisitsUp: false,
      purchases: '2,102',
      isPurchasesUp: false,
      percent: '17%',
      isPercentUp: false
    },
    {
      image: 'app/browsers/safari.svg',
      browser: 'Safari',
      visits: '4,001',
      isVisitsUp: false,
      purchases: '1,001',
      isPurchasesUp: false,
      percent: '14%',
      isPercentUp: true
    },
    {
      image: 'app/browsers/opera.svg',
      browser: 'Opera',
      visits: '1,833',
      isVisitsUp: true,
      purchases: '83',
      isPurchasesUp: true,
      percent: '5%',
      isPercentUp: false
    }
  ];

  users = [
    {
      "id": 1,
      "name": "Esther Vang",
      "status": 4,
      "group": 3
    },
    {
      "id": 2,
      "name": "Leah Freeman",
      "status": 3,
      "group": 1
    },
    {
      "id": 3,
      "name": "Mathews Simpson",
      "status": 3,
      "group": 2
    },
    {
      "id": 4,
      "name": "Buckley Hopkins",
      "group": 4
    },
    {
      "id": 5,
      "name": "Buckley Schwartz",
      "status": 1,
      "group": 1
    },
    {
      "id": 6,
      "name": "Mathews Hopkins",
      "status": 4,
      "group": 2
    },
    {
      "id": 7,
      "name": "Leah Vang",
      "status": 4,
      "group": 1
    },
    {
      "id": 8,
      "name": "Vang Schwartz",
      "status": 4,
      "group": 2
    },
    {
      "id": 9,
      "name": "Hopkin Esther",
      "status": 1,
      "group": 2
    },
    {
      "id": 10,
      "name": "Mathews Schwartz",
      "status": 1,
      "group": 3
    }
  ];

  statuses = [
    { value: 1, text: 'Good' },
    { value: 2, text: 'Awesome' },
    { value: 3, text: 'Excellent' },
  ];

  groups = [
    { id: 1, text: 'user' },
    { id: 2, text: 'customer' },
    { id: 3, text: 'vip' },
    { id: 4, text: 'admin' }
  ];

  constructor() {
    this.editableTableData = this.smartTableData.slice(0, 36);
  }
}
