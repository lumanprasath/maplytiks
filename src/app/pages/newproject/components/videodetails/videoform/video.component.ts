import {Component} from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {Video} from './video';

@Component({
  
  selector: 'video-form',
  template: require('./video.html'),
})
export class VideoForm {

  constructor(private router: Router) {
  }


  model = new Video('Dr IQ', 23);
  submitted = false;
  onSubmit() { this.submitted = true; }


// newHero() {
//     this.model = new Video( '');
//   }

  clickback() {
    this.router.navigate(['/pages/newproject/branddetails']);
  }


   showFormControls(form: any) {
    return form && form.controls['ame'] &&
    form.controls['ame'].value; // Dr. IQ
  }


}
