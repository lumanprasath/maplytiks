import { Component, ViewEncapsulation, Inject, Input, Output, EventEmitter, ViewChild,ElementRef, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormGroup, AbstractControl, FormBuilder, Validators} from '@angular/forms';
import { EmailValidator, EqualPasswordsValidator} from '../../../theme/validators';
import { View} from "angular2/angular2";
import { HttpServices} from "../../../shared/services/httpservice";
import { LocalStorageService } from 'angular-2-local-storage';
import { LocalDataSource } from 'ng2-smart-table';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
@Component({
  selector: 'all-login',
  encapsulation: ViewEncapsulation.None,
  styles: [require('./adminlogin.scss')],
  template: require('./adminlogin.html')
})

export class AdminLogin implements OnInit {

 public adminform:FormGroup;
 public firstname:AbstractControl;
 public lastname:AbstractControl;
 public phone:AbstractControl;
 public email:AbstractControl;
 public company:AbstractControl;
 public vcUsername:AbstractControl;
 private dropDownRole:any[];
 private selectedRole:any;
 private dropDownStatus:any[];
 private selectedStatus:any;
 private id:AbstractControl;

 public submitted:boolean = false;

    query: string = '';
    settings = {
    add: {
      addButtonContent: '<i class="ion-ios-plus-outline"></i>',
      createButtonContent: '<i class="ion-checkmark"></i>',
      cancelButtonContent: '<i class="ion-close"></i>',
      
    },
    edit: {
      editButtonContent: '<i class="ion-edit"></i>',
      saveButtonContent: '<i class="ion-checkmark"></i>',
      cancelButtonContent: '<i class="ion-close"></i>',
      confirmSave: true
    },
    delete: {
      deleteButtonContent: '<i class="ion-trash-a"></i>',
      confirmDelete: true
    },
    actions:{
      columnTitle:'Login',
      add:false,
      edit:false,
      delete:false
    },
    
    columns: {
    product: {
        title: 'Product',
        type: 'string'
      },
     role_id: {
        title: 'Role',
        type: 'string'
     },
     vcUsername:{
        title: 'User Name',
        type: 'string'
      },
     
      vcphonenumber: {
        title: 'Phone',
        type: 'string'
      },
      vcCompany: {
        title: 'Company',
        type: 'string'
      },
     status: {
        title: 'Status',
        type: 'string'
      },
       vcFirstname: {
        title: 'First Name',
        type: 'string'
      },
      vcLastname: {
        title: 'Last Name',
        type: 'string'
      },
      
     lastUpdatedDate: {
        title: 'Updated Date',
        type: 'custom'
        },
    }
  };





constructor(private router: Router, private _httpService: HttpServices,fb:FormBuilder, private localStorageService: LocalStorageService,public toastr: ToastsManager) { 
    this.adminform = fb.group({
      'id':['', ],
    'firstname': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
    'lastname': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
     'company': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
     'phone': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
     'email': ['', Validators.compose([Validators.required, EmailValidator.validate])],
     'vcUsername': ['', Validators.compose([Validators.required, Validators.minLength(4)]) ]
     
    })
   this.id = this.adminform.controls['id'];
   this.firstname = this.adminform.controls['firstname'];
   this.lastname = this.adminform.controls['lastname'];
   this.company = this.adminform.controls['company'];
   this.phone = this.adminform.controls['phone'];
   this.email = this.adminform.controls['email'];
   this.vcUsername = this.adminform.controls['vcUsername'];
   
}

public Update(event){
  let self = this;
  var post_data = { userid:event.id, vcFirstname:event.firstname,vcLastname:event.lastname,vcphonenumber:event.phone,vcEmail:event.email,vcCompany:event.company,vcUsername:event.vcUsername, status:self.selectedStatus,role_id:self.getRoleId(self.selectedRole),lastUpdatedDate:new Date().toLocaleString(), upDatedBy:localStorage.getItem('user_id') }
  self.updatedUser(post_data,self);
  self.requestAllUserList(self);
}

public Delete(event){
  let self = this;
  var post_data = { userid:event.id, status:'Deactive', lastUpdatedDate:new Date().toLocaleString(), upDatedBy:localStorage.getItem('user_id') }
  self.deleteUser(post_data,self);
  self.requestAllUserList(self);
}
public reset(event){
    let self = this;
    self.adminform.controls['firstname'].setValue("")
    self.adminform.controls['lastname'].setValue("")
    self.adminform.controls['company'].setValue("")
    self.adminform.controls['phone'].setValue("")
    self.adminform.controls['email'].setValue("")
    self.adminform.controls['vcUsername'].setValue("")
}


source: LocalDataSource = new LocalDataSource();

ngOnInit(){
          
              let self = this;
              var post_data = {userID:localStorage.getItem('user_id')}
              var  status = [{status:'Active'},{status:'Deactive'},{status:'Ideal'}];
              self.dropDownStatus = status
               var  role = [{roleid:'01',role:'Admin'},{roleid:'02',role:'Right Holders'},{roleid:'03',role:'Brand Holders'},{roleid:'04',role:'Public'}];
              self.dropDownRole = role
              self.requestAllUserList(self);
              self.selectedStatus = status[0].status
              self.selectedRole = role[0].role
}

CustomEditorComponent(event): void {
    let self =this;
    var data = [];
    self.adminform.controls['id'].setValue(event.data.id)
    self.adminform.controls['firstname'].setValue(event.data.vcFirstname)
    self.adminform.controls['lastname'].setValue(event.data.vcLastname)
    self.adminform.controls['company'].setValue(event.data.vcCompany)
    self.adminform.controls['phone'].setValue(event.data.vcphonenumber)
    self.adminform.controls['email'].setValue(event.data.vcUsername)
    self.adminform.controls['vcUsername'].setValue(event.data.vcUsername)
    this.selectedRole = event.data.role_id;
    this.selectedStatus = event.data.status;
}

  

requestAllUserList(self){
self._httpService.GetHttp("user_list")
            .subscribe(
            (data2) => {
                self.TransformTableData(data2,self)
        },
            (error) => {
               console.log(error);
            }
            );
}

deleteUser(post_data,self){
self._httpService.PutHttp(JSON.stringify(post_data),"delete_user")
            .subscribe(
            (data2) => {
               self.toastr.warning('Access Revoked');  
            },
            (error) => {
               console.log(error);
          }
       );
}

updatedUser(post_data,self){
  self._httpService.PutHttp(JSON.stringify(post_data),"update_user")
            .subscribe(
            (data2) => {
               self.toastr.success('Successfully Updated');  
            },
            (error) => {
               console.log(error);
          }
       );
}



TransformTableData(data2,self){
  var data=[];
  self.allProjectData = data2;
  for(var i = 0; i < data2.length; i++){
     var d = { id:data2[i]._id, vcFirstname: data2[i].vcFirstname,vcLastname:data2[i].vcLastname,vcphonenumber:data2[i].vcphonenumber,product:data2[i].product,vcCompany: data2[i].vcCompany,vcUsername:data2[i].vcUsername,lastUpdatedDate:data2[i].lastUpdatedDate,role_id:self.getRoleName(data2[i].role_id),status:data2[i].status }
    data.push(d);
  }
  
  self.source.load(data);
 
}

getRoleName(role_id){
    var role="";
    if(role_id =='01'){
        role="Admin";
    }else if(role_id =='02') {
        role="Right Holders";
    }else if(role_id =='03') {
        role="Brand Holders";
    }else{
        role ='Public';
    }
    return role;
}

getRoleId(roleName) {
    var role="";
    if(roleName =='Admin'){
        role="01";
    }else if(roleName =='Right Holders'){
        role="02";
    }else if(roleName =='Brand Holders'){
        role="03";
    }else{
        role ='04';
    }
    return role;
}


}