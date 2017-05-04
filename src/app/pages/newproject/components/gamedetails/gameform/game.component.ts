import {Component, ViewContainerRef} from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { BaImageLoaderService, BaThemePreloader, BaThemeSpinner } from '../../../../../theme/services';
import {BrandDetails} from './components/branddetails/branddetails.component';
import { layoutPaths } from '../../../../../theme/theme.constants';
// noinspection TypeScriptValidateTypes

 

@Component({
  selector: 'game-form',
  template: require('./game.html')

})
export class GameForm {


  constructor(private router: Router,   private _imageLoader: BaImageLoaderService) { }
    
clicked() {
   
    
    this.router.navigate(['/pages/newproject/branddetails']);
    
  }

  //   private _loadImages(): void {
  //   // register some loaders
  //   BaThemePreloader.registerLoader(this._imageLoader.load(layoutPaths.images.root + 'sky-bg.gif'));
  // }
  

}

