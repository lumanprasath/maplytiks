import { NgModule, ApplicationRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { ToastModule, ToastOptions} from 'ng2-toastr/ng2-toastr';
import { removeNgStyles, createNewHosts, createInputTransfer } from '@angularclass/hmr';
import { HttpServices } from './shared/services/httpservice';
import { Config } from './config/config';
import { LocalStorageModule } from 'angular-2-local-storage';
import { LocalStorageService } from 'angular-2-local-storage';
import { CarouselModule } from 'ng2-bootstrap';
import * as d3 from "d3";
import {scaleLinear} from "d3-scale";




/*
 * Platform and Environment providers/directives/pipes
 */
import { ENV_PROVIDERS } from './environment';
import { routing } from './app.routing';

// App is our top level component
import { App } from './app.component';
import { AppState, InternalStateType } from './app.service';
import { GlobalState } from './global.state';
import { NgaModule } from './theme/nga.module';
import { PagesModule } from './pages/pages.module';

// Application wide providers
const APP_PROVIDERS = [
  AppState,
  GlobalState
];

type StoreType = {
  state: InternalStateType,
  restoreInputValues: () => void,
  disposeOldHosts: () => void
};


let options = <ToastOptions>{
  animate: 'flyRight',
  positionClass: 'toast-bottom-right',
  toastLife: 5000
};
/**
 * `AppModule` is the main entry point into Angular2's bootstraping process
 */
@NgModule({
  bootstrap: [App],
  declarations: [
    App
  ],
  imports: [ // import Angular's modules
    BrowserModule,
    HttpModule,
    RouterModule,
    
    FormsModule,
    ToastModule.forRoot(options),
    ReactiveFormsModule,
    NgaModule.forRoot(),
    CarouselModule,
    PagesModule,
    routing,
        LocalStorageModule.withConfig({
            prefix: 'my-app',
            storageType: 'localStorage'
        })
  ],
  providers: [ // expose our Services and Providers into Angular's dependency injection
    ENV_PROVIDERS,
    APP_PROVIDERS,
    HttpServices, Config, LocalStorageService
  ]
})

export class AppModule {

  constructor(public appRef: ApplicationRef, public appState: AppState) {
  }

  hmrOnInit(store: StoreType) {
    if (!store || !store.state) return;
    console.log('HMR store', JSON.stringify(store, null, 2));
    // set state
    this.appState._state = store.state;
    // set input values
    if ('restoreInputValues' in store) {
      let restoreInputValues = store.restoreInputValues;
      setTimeout(restoreInputValues);
    }
    this.appRef.tick();
    delete store.state;
    delete store.restoreInputValues;
  }

  hmrOnDestroy(store: StoreType) {
    const cmpLocation = this.appRef.components.map(cmp => cmp.location.nativeElement);
    // save state
    const state = this.appState._state;
    store.state = state;
    // recreate root elements
    store.disposeOldHosts = createNewHosts(cmpLocation);
    // save input values
    store.restoreInputValues = createInputTransfer();
    // remove styles
    removeNgStyles();
  }

  hmrAfterDestroy(store: StoreType) {
    // display new elements
    store.disposeOldHosts();
    delete store.disposeOldHosts;
  }
}
