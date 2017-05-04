import {Component, ViewEncapsulation} from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormGroup, FormControl, FormArray, FormBuilder,  Validators } from '@angular/forms';
import {Customer} from './customer.interface';
import {HttpServices} from "../../shared/services/httpservice";
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { FileUploader } from 'ng2-file-upload';
import { Options } from './options';
import * as _ from "lodash";

@Component({
  selector: 'formdetails-newproject',
  styles: [require('./newproject.scss')],
    template: require('./newproject.html'),
})
export class FormDetailsNewproject {

     public myForm: FormGroup;
     private dropDownSports:any[];
     private selectedTournaments:any;
     private selectedSports:any; 
     private dropDownTournaments:any[];
     private dropDownRounds:any[];
     private selectedRound:any;
     private selectedTeamsA:any;
     private selectedTeamsB:any;
     private dropDownTeams:any[];
     private selectedGender:any;
     private dropDownGender:any[];
     private selectedMatches:any;
     private selectedPlayersA:any;
     private selectedPlayersB:any;
     private dropDownPlayers:any[];
     private dropDownMatches:any[];
     public events: any[] = [];
     public submitted: boolean
     private tour_list:any;
     private allbrand:any;
     private inputHost:string;
     private inputPort:number;
     private InputEmail:string;
     private InputPassword:string;
     private message:string;
     
     private uploaderImageList:any[];
     private brandData:any[];
     private imagesList:any[];
     
     private servertype:any[];
     
    

  constructor(private router: Router, public toastr: ToastsManager,private _fb: FormBuilder,private _httpService: HttpServices) {
  }

    ngOnInit() {
            let self= this;
            self.processForm(self);
            self.gameclicked()
            jQuery("#match").hide();
            self.myForm = self._fb.group({
                addresses: this._fb.array([])
            }); 
            console.log(self.selectedOption)
             self.servertype =[{id:2,name:'FTP'},{id:1,name:'SFTP'}];
            this.addAddress();
            
    }

 selectedOption:Options = new Options(2, 'SFTP' );
  options = [
     new Options(1, 'FTP' ),
     new Options(2, 'SFTP' )


  ];
   
  getValue(optionid) {
      this.selectedOption = this.options.filter((item)=> item.id == optionid)[0];
       console.log(this.selectedOption.name)
  }

   public uploader:FileUploader = new FileUploader({url:'http://localhost:3001/upload'});
   public hasBaseDropZoneOver:boolean = false;
   public hasAnotherDropZoneOver:boolean = false;

   public fileOverBase(e:any):void {
        this.hasBaseDropZoneOver = e;
   }

   public fileOverAnother(e:any):void {
        this.hasAnotherDropZoneOver = e;
   }
   public changeListener(e:any):void {
      let self =this;
      var data = this.readThis(e.target,self);
      
    
   }
  public uploadChanges(e:any):void {
  let self =this;
  this.readAllFile(e.target,self);
  }

   readAllFile(inputValue: any,self) : void {
       var len = self.uploader.queue
       var imageFromFileList = [];
       for (var i=0; i<len.length; i++) {
           if(i!==0){
            imageFromFileList.push(len[i].file.name);
        }
       }

      console.log(self.imagesList)
      console.log(imageFromFileList)

      if(self.imagesList.length === imageFromFileList.length){

      var d=  _.difference(self.imagesList, imageFromFileList);
      if(d.length!=0){
           
           jQuery("#uploadAll").hide();
           self.toastr.warning('Mismatch In file');
           
      }else
        {
        self.toastr.success('Files are ok'); 
      }
      
    }else{
        jQuery("#uploadAll").hide();
        self.toastr.warning('Files are Missing');
        
    }
      
   }


	


 readThis(inputValue: any,self) : any {
    
    var file:File = inputValue.files[0]; 
    var myReader:FileReader = new FileReader();
    var csv = myReader.readAsText(file);
     myReader.onloadend = function(e){
          var csv = myReader.result;
           var allTextLines = csv.split(/\r\n|\n/);
           var lines=[]; 
           var imageName = [];
           for (var i=0; i<allTextLines.length; i++) {
               var data = allTextLines[i].split(';');
               var content;
               var partsOfStr = [];
            if(i!==0){
               for (var j=0; j<data.length; j++) {
                   content =  data[j];
                   partsOfStr = content.split(',');
                   
               }
               if(partsOfStr[1]!=""){
                   var data_push = { street:partsOfStr[1],asset:partsOfStr[0],tagline:partsOfStr[2],imageupload:partsOfStr[3]}
                    imageName.push(partsOfStr[3])
                    lines.push(data_push);
               }
               
            }
           }
           self.brandData =  lines;
           self.uploaderImageList = imageName;
           var evens = _.remove(imageName, function(n) {
        return n ;
        });
           self.imagesList = evens;
        
    }
    
   }

  








OnChangeSports(){
    let self = this;
    var matchlist =[];
    for (var i = 0; i < self.dropDownSports.length; i++) {
        var temp = self.dropDownSports[i];
        if(temp.sports == self.selectedSports){
            if(temp.sports == 'Tennis'){
               matchlist = self.dropDownSports[i].match
              
              jQuery("#match").show()
              jQuery("#players").show()
             }else{
                 jQuery("#match").hide()
                 jQuery("#players").hide()
             }
            self.tour_list = self.dropDownSports[i].tournament
            self.dropDownRounds = self.dropDownSports[i].rounds
            }
    }

    if(matchlist.length>0){
        self.dropDownMatches =   matchlist
        self.selectedMatches = self.dropDownMatches[0]
    } 
        var array_tor = [];
        for (var i = 0; i < self.tour_list.length; i++) {
                array_tor.push(self.tour_list[i].name);
        }
        self.dropDownTournaments = array_tor;
        self.selectedTournaments = self.dropDownTournaments[0];
        self.selectedRound = self.dropDownRounds[0];
        for (var i = 0; i < self.tour_list.length; i++) {
        var temp = self.tour_list[i];
        if(temp.name == self.selectedTournaments && self.selectedSports !== 'Tennis'){
            self.dropDownTeams = temp.teams
        }
    }
  
    
}

OnChangeTournament(){
    let self = this;
    var team_list =[];
    var playerList=[];
   
    for (var i = 0; i < self.tour_list.length; i++) {
        var temp = self.tour_list[i];
        if(temp.name == self.selectedTournaments && self.selectedSports == 'Tennis'){
           for(var j=0; j< temp.teams.length; j++){
               if(temp.teams[j].hasOwnProperty('name')){
                  team_list.push(temp.teams[j].name);
                  var p_s= temp.teams[j].players
                  var k=0;
                  if(j==0 && k==0) {
                  for(k; k< p_s.length; k++){
                      playerList = p_s[k].Men
                    }
                      
                  }
                 
                }else{
                   playerList =  temp.teams[j].players[0].Men
                   team_list.push('none')
               }
               
           }
           self.dropDownTeams = team_list
           self.dropDownPlayers = playerList
           self.selectedPlayersA = self.dropDownPlayers[0]
           self.selectedPlayersB = self.dropDownPlayers[0]
        } 
        if(temp.name == self.selectedTournaments && self.selectedSports !== 'Tennis'){
            self.dropDownTeams = temp.teams
        }
    }
    self.selectedTeamsA = self.dropDownTeams[0]
    self.selectedTeamsB = self.dropDownTeams[0]
}

OnChangeMatches(){
   let self = this;
   var team_list =[];
   var playerList=[];
   for (var i = 0; i < self.tour_list.length; i++) {
        var temp = self.tour_list[i];
        if(temp.name == self.selectedTournaments && self.selectedSports == 'Tennis'){
              for(var j=0; j< temp.teams.length; j++){
                  var pl=temp.teams[j].players[0];
                  if(self.selectedMatches == "Men Singles"){
                      playerList = temp.teams[j].players[0].Men
                  }
                  if(self.selectedMatches == "Men Doubles"){
                      playerList = temp.teams[j].players[0].Men
                  }
                  if(self.selectedMatches == "Mixed Doubles"){
                      var l1 = temp.teams[j].players[0].Men
                      var l2 = temp.teams[j].players[0].Women
                      playerList = l1.concat(l2)
                  }
                  if(self.selectedMatches == "Women Singles"){
                      playerList = temp.teams[j].players[0].Women
                  }
                  if(self.selectedMatches == "Women Doubles"){
                      playerList = temp.teams[j].players[0].Women
                  }
              }
        }
    }
    self.dropDownPlayers = playerList
    self.selectedPlayersA = self.dropDownPlayers[0]
    self.selectedPlayersB = self.dropDownPlayers[0]
}

processForm(self){
   
self._httpService.GetHttp("game_details")
            .subscribe(
            (data) => {
                self.gameList = data;
                self.dropDownSports = data
                self.selectedSports = self.dropDownSports[0]._id;
            },
            (error) => {
               console.log(error);
            }
            );
   
}

 initAddress() {
        return this._fb.group({
            street: ['', Validators.required],
            asset: ['', Validators.required],
            tagline:['', Validators.required],
            imageupload:['']
            
        });
    }

       


     

addAddress() {
       const control = <FormArray>this.myForm.controls['addresses'];
       const addrCtrl = this.initAddress();
       control.push(addrCtrl);
    }


 removeAddress(i: number) {
        const control = <FormArray>this.myForm.controls['addresses'];
        control.removeAt(i);
    }

none(){
    jQuery("#game").hide()
    jQuery("#video").hide()
    jQuery("#brand").hide()

}

  gameclicked() { 
    
    jQuery("#game").show()
    jQuery("#game_id").addClass("current");
    jQuery("#video").hide()
    jQuery("#video_id").removeClass("current");
    jQuery("#brand").hide()
    jQuery("#brand_id").removeClass("current");
    
}

brandclicked() {  
    jQuery("#game").hide()
    jQuery("#game_id").removeClass("current");
    jQuery("#video").hide()
    jQuery("#video_id").removeClass("current");
    jQuery("#brand_id").addClass("current");
    jQuery("#brand").show()
}


    videoclicked(model: Customer) { 
      let self =  this;
    jQuery("#video_id").addClass("current");
    jQuery("#game").hide()
    jQuery("#game_id").removeClass("current");
    jQuery("#video").show()
    jQuery("#brand").hide()
    jQuery("#brand_id").removeClass("current");
    self.allbrand = model;
    
   
   
}

  submit(){

        
        let self =  this;
        let d = new Date().toLocaleString()
        var data;
        var data_len = 0 ;
        data_len = self.allbrand.addresses.length;
        if( data_len != 0){
            data = { brand_details : self.allbrand.addresses, sports : self.selectedSports, tournament : self.selectedTournaments, round : self.selectedRound, team_A : self.selectedTeamsA, team_B : self.selectedTeamsB, servertype:self.selectedOption.name,host:self.inputHost,port:self.inputPort,  userID : self.InputEmail, password : self.InputPassword, message : self.message,inserted:d ,status:'Pending', vcUsername : localStorage.getItem('user_id') }
        }else{
         data = { brand_details : self.brandData, sports : self.selectedSports, tournament : self.selectedTournaments, round : self.selectedRound, team_A : self.selectedTeamsA, team_B : self.selectedTeamsB, servertype:self.selectedOption.name,host:self.inputHost,port:self.inputPort,  userID : self.InputEmail, password : self.InputPassword, message : self.message,inserted:d,status:'Pending', vcUsername : localStorage.getItem('user_id') }
        }
        self.requestToInsertProjectDetails(data,self)
        
    }

    requestToInsertProjectDetails(post_data,self){
     self._httpService.PostHttp(JSON.stringify(post_data),"project_details")
            .subscribe(
              (data2) => {
                   this.toastr.success('Success!');
                   this.router.navigate(['/pages/dashboard']);
              },
              (error) => {
                self.customeError(error);
            }
            );
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
         this.router.navigate(['/pages/newproject/formdetails-newproject']);
         this.toastr.error(errMessage, null, { enableHTML: true });
    }

getAllProjects(){
    this.router.navigate(['/pages/dashboard']);
}

}