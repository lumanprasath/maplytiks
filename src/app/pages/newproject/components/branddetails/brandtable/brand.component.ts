import {Component} from '@angular/core';
import { FormGroup, FormArray, FormBuilder,  Validators } from '@angular/forms';
import {Customer} from './customer.interface';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'brand-form',
  styles: [require('./brand.scss')],
  template: require('./brand.html'),
})
export class BrandTable {
   public myForm: FormGroup;

  constructor(private _fb: FormBuilder, private router: Router) {
  }



ngOnInit() {
        this.myForm = this._fb.group({
            brand: ['', [Validators.required, Validators.minLength(5)]],
            addresses: this._fb.array([
                this.initAddress(),
            ])
        });
    }


initAddress() {
        return this._fb.group({
            street: ['', Validators.required],
            postcode: ['']
        });
    }

addAddress() {
        const control = <FormArray>this.myForm.controls['addresses'];
        control.push(this.initAddress());
    }


   removeAddress(index: number) {
        const control = <FormArray>this.myForm.controls['addresses'];
        control.removeAt(index);
    }


        save(model: Customer) {
        // call API to save
        // ...
        console.log(model);
    }

fakeArray = new Array(12);

clicked() {
     
    this.router.navigate(['/pages/newproject/videodetails']);
  }

clickback() {
     
    this.router.navigate(['/pages/newproject/gamedetails']);
  }


}
