import {Component, ViewEncapsulation, Inject, Input, Output, EventEmitter, ViewChild,ElementRef, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {View} from "angular2/angular2";
import {HttpServices} from "../../../shared/services/httpservice";
import { LocalStorageService } from 'angular-2-local-storage';
import { LocalDataSource } from 'ng2-smart-table';
import { FormGroup, AbstractControl, FormBuilder, Validators} from '@angular/forms';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
@Component({
  selector: 'all-projects',
  encapsulation: ViewEncapsulation.None,
  styles: [require('./admin.scss')],
  template: require('./admin.html')
})

export class Admin implements OnInit {
    private selected_match:any;
    private dropDownMatch:any[];
    private dropDownLeague:any[];
    private selected_league:any;
    public type:string;
    private selected_interval:any;
    private dropDownInterval:any[];
    private dropDownBrand:any[];
    private brand_list:any[];
    private selected_brand:any[];
    private allProjectData:any[];
   
    public projectform:FormGroup;
    public username:AbstractControl;
    public sports:AbstractControl;
    public leauge:AbstractControl;
    public server:AbstractControl;
    public host:AbstractControl;
    private dropDownStatus:any[];
    private selectedStatus:any;
    private id:AbstractControl;

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
    },
    delete: {
      deleteButtonContent: '<i class="ion-trash-a"></i>',
      confirmDelete: true
    },
    actions:{
      columnTitle:'Project',
      add:false,
      edit:false,
      delete:false
    },
    
    columns: {
      vcUsername:{
        title: 'User Name',
        type: 'string'
      },
      sports: {
        title: 'Sports',
        type: 'string'
      },
      tournament: {
        title: 'Leauge',
        type: 'string'
      },
      servertype: {
        title: 'Server',
        type: 'string'
      },
      host: {
        title: 'Host',
        type: 'string'
      },
      inserted: {
        title: 'Last Updated',
        type: 'string'
      },
      
      brand: {
        title: 'Brand Details',
        type: 'custom'
        },
         status: {
        title: 'status',
        type: 'string'
      },
     }
  };

brandsettings = {
    
    add: {
      addButtonContent: '<i class="ion-ios-plus-outline"></i>',
      createButtonContent: '<i class="ion-checkmark"></i>',
      cancelButtonContent: '<i class="ion-close"></i>',
    },
    edit: {
      editButtonContent: '<i class="ion-edit"></i>',
      saveButtonContent: '<i class="ion-checkmark"></i>',
      cancelButtonContent: '<i class="ion-close"></i>',
    },
    delete: {
      deleteButtonContent: '<i class="ion-trash-a"></i>',
      confirmDelete: true
    },
    actions:{
      columnTitle:'Brands',
      add:false,
      edit:false,
      delete:false
    },
    
    columns: {
     
      brand: {
        title: 'Brand',
        type: 'string'
      },
      asset: {
        title: 'Asset',
        type: 'string'
      },
      tagline: {
        title: 'Tag Line',
        type: 'string'
      },
      imageupload: {
        title: 'Image',
        type: 'string'
      }
      
    }
  };

getTableData(data2,self){
  var data=[];
  self.allProjectData = data2;
  for(var i = 0; i < data2.length; i++){
    var href=''
    var d = {id:data2[i]._id, vcUsername: data2[i].vcUsername,sports:data2[i].sports,tournament:data2[i].tournament,servertype:data2[i].servertype,host: data2[i].host,inserted:data2[i].lastUpdatedDate,status:data2[i].status,brand:data2[i].brand_details.length  }
    data.push(d);
  }
  
  self.source.load(data);
 
}
  constructor(private router: Router,fb:FormBuilder, private _httpService: HttpServices, private localStorageService: LocalStorageService,public toastr: ToastsManager) { 
        this.projectform = fb.group({
      'id':['', ],
    'username': ['', ],
    'sports': ['', ],
     'leauge': ['', ],
     'server': ['', ],
     'host': ['', ],
     'vcUsername': ['', Validators.compose([Validators.required, Validators.minLength(4)]) ]
     
    })
   this.id = this.projectform.controls['id'];
   this.username = this.projectform.controls['username'];
   this.sports = this.projectform.controls['sports'];
   this.leauge = this.projectform.controls['leauge'];
   this.server = this.projectform.controls['server'];
   this.host = this.projectform.controls['host'];
  
   }
    source: LocalDataSource = new LocalDataSource();
    brandsource: LocalDataSource = new LocalDataSource();


  ngOnInit(){
          
              let self = this;
              var post_data = {userID:localStorage.getItem('user_id')}
              self.requestAllProjectList(post_data,self);
              var  status = [{status:'Pending'},{status:'Progress'},{status:'Completed'}];
              self.dropDownStatus = status
              self.selectedStatus = status[0].status
}


public Update(event){
 
      let self = this;
      var deletedId = "1";
      var post_data = {userid:event.id,sports:event.sports,league:event.leauge,host:event.host,server:event.server, status:self.selectedStatus, lastUpdatedDate:new Date().toLocaleString(), upDatedBy:localStorage.getItem('user_id'),deletedId:deletedId}
      self.updatedProjectDetails(post_data,self)
     var post_data1 = {userID:localStorage.getItem('user_id')}
     self.requestAllProjectList(post_data1,self);
} 
public Delete(event){
  let self = this;
  
  var post_data = { deletedId:"2",userid:event.id,lastUpdatedDate:new Date().toLocaleString(), upDatedBy:localStorage.getItem('user_id')}
  self.deletedProjectDetails(post_data,self);
  var post_data1 = {userID:localStorage.getItem('user_id')}
     self.requestAllProjectList(post_data1,self);
}
public reset(event){
let self = this;
}



CustomEditorComponent(event): void {
    let self =this;
    var data = [];
    self.projectform.controls['id'].setValue(event.data.id)
    self.projectform.controls['username'].setValue(event.data.vcUsername)
    self.projectform.controls['sports'].setValue(event.data.sports)
    self.projectform.controls['leauge'].setValue(event.data.tournament)
    self.projectform.controls['server'].setValue(event.data.servertype)
    self.projectform.controls['host'].setValue(event.data.host)
    self.selectedStatus  = event.data.status
    var d =self.allProjectData;
    for(var i = 0; i <  d.length; i++){
   
     if(d[i]._id == event.data.id){
        var brand =  d[i].brand_details;
        for(var j = 0;j< brand.length; j++){
          var b = { id:j+1,brand:brand[j].street,asset:brand[j].asset,tagline:brand[j].tagline,imageupload:brand[j].imageupload}
          data.push(b)
        }
     } 
    }

      self.brandsource.load(data);

  }

updatedProjectDetails(post_data,self){
  self._httpService.PutHttp(JSON.stringify(post_data),"updated_project")
            .subscribe(
            (data2) => {
               self.toastr.success('Successfully Updated');  
            },
            (error) => {
               console.log(error);
          }
       );
}



deletedProjectDetails(post_data,self){
self._httpService.PutHttp(JSON.stringify(post_data),"delete_project")
            .subscribe(
            (data2) => {
               self.toastr.warning('Access Revoked');  
            },
            (error) => {
               console.log(error);
          }
       );
}



requestAllProjectList(post_data,self){
        self._httpService.PostHttp(JSON.stringify(post_data),"all_projects")
                    .subscribe(
                    (data2) => {
                      self.getTableData(data2,self);
                    },
                    (error) => {
                      console.log(error);
                    }
                );
        }
}

