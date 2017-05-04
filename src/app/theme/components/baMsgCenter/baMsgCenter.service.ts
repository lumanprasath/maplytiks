import {Injectable} from '@angular/core'

@Injectable()
export class BaMsgCenterService {

private _notifications = [
   {
     name: 'Vlad',
     text: 'Your Brand is found in more than 1000 blogs in tumblr last week',
     time: '1 min ago'
   },
   {
     name: 'Kostya',
     text: 'Your Brand is performing 10 times better than others in the same category over twitter',
     time: '2 hrs ago'
   },
   {
     image: 'assets/img/shopping-cart.svg',
     text: 'Now you can even use elastic search.',
     time: '5 hrs ago'
   },
   {
     name: 'Andrey',
     text: 'More than 80% of the tweets has found to have positive sentiments for your brand',
     time: '1 day ago'
   }
 ];

 private _messages = [
   {
     name: 'Nasta',
     text: 'Check-out our website to know more about our products',
     time: '1 min ago'
   },
   {
     name: 'Vlad',
     text: 'Want to know, What context people are using your brand in images across different social media platform ? Try our other products.',
     time: '2 hrs ago'
   },
   {
     name: 'Kostya',
     text: 'Want to request an extension for further analysis? Reach out to us...',
     time: '10 hrs ago'
   },
   {
     name: 'Kostya',
     text: 'Need some support to reach your goals? Ask our expert how to improve your social reach...',
     time: '2 days ago'
   },
   {
     name: 'Vlad',
     text: 'Welcome to Drive Dashboard, Hope you will find a lot of potential customers with our help. For any help reach out to our experts',
     time: '1 week ago'
   }
 ];

  public getMessages():Array<Object> {
    return this._messages;
  }

  public getNotifications():Array<Object> {
    return this._notifications;
  }
}
