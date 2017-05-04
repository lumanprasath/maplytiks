import { Component, ViewEncapsulation, ViewContainerRef } from '@angular/core';
import {FormGroup, AbstractControl, FormBuilder, Validators} from '@angular/forms';
import {HttpServices} from "../../shared/services/httpservice";
import { Router } from '@angular/router';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';


@Component({
  selector: 'login',
  encapsulation: ViewEncapsulation.None,
  styles: [require('./login.scss')],
  template: require('./login.html'),
})
export class Login {

  public form:FormGroup;
  public email:AbstractControl;
  public password:AbstractControl;
  public submitted:boolean = false;
  private httpServices: HttpServices;
  

  constructor(fb:FormBuilder,httpServices: HttpServices, public toastr: ToastsManager, private router: Router,private viewContainerRef: ViewContainerRef) {
    
    this.httpServices = httpServices;
    this.toastr.setRootViewContainerRef(viewContainerRef);
    this.form = fb.group({
      'email': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
      'password': ['', Validators.compose([Validators.required, Validators.minLength(4)])]
    });

    this.email = this.form.controls['email'];
    this.password = this.form.controls['password'];
  }

  public onSubmit(values:Object):void {
    this.submitted = true;
    if (this.form.valid) {
      let self =this;
      // your code goes here
      
       var post_data = {vcUsername:this.email.value ,vcPassword:this.password.value}
       localStorage.setItem("user_id",this.email.value);
       self.httpServices.PostHttpWithoutToken(JSON.stringify(post_data),"login")
       .subscribe(
              (data2) => {
                localStorage.setItem("id",data2.id);
                this.toastr.success('Success!');
                this.onSuccess(data2);
              },
               (error) => {
                this.customeError(error);
            }
       );

        

    }
  }

onSuccess(success) {
        
        localStorage.setItem("id_token",success.result);
        this.router.navigate(['chartist-js']);
    }

    customeError(error) {
      console.log(error);
        var errMessage = "<ul style='vertical-align: middle; margin: 0;'>";
        if (error.error) {
            error.error.forEach((message) => {
                console.log(message);
                errMessage += "<li style='text-transform: uppercase; font-size:10px;'>" + message.message + "</li>"
            })
        }
        errMessage += "</ul>";
         this.router.navigate(['login']);
         this.toastr.error(errMessage, null, { enableHTML: true });
    }

}
