import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FileUploader } from 'ng2-file-upload';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';


@Component({
  selector: 'address',
  template: require('./address.components.html'),
})
export class AddressComponent {
   
    @Input('group')
    public adressForm: FormGroup;
    private dropDownAsset:any[];
    private selectedAsset:any; 
    public imageupload:any;
    
    ngOnInit() {
      let self =  this;
      self.dropDownAsset = ["MAT", "LED", "Apparel", "Goalpost", "Changeroom", "Grass","BAT", "Stumps", "Sight Screen"]
      self.selectedAsset = self.dropDownAsset[0];
      
    }

constructor( public toastr: ToastsManager) {}

   public uploader:FileUploader = new FileUploader({url:'http://localhost:3001/upload'});
   public hasBaseDropZoneOver:boolean = false;
   public hasAnotherDropZoneOver:boolean = false;
   public fileOverBase(e:any):void {
        this.hasBaseDropZoneOver = e;
        
    }

  

    public fileOverAnother(e:any):void {
        this.hasAnotherDropZoneOver = e;
    }

    
    public fileupload(){
      let self= this;
       for (var i=0; i<self.uploader.queue.length; i++) {
          self.imageupload = self.uploader.queue[i].file.name;
          self.adressForm.controls['imageupload'].setValue(self.imageupload)
          //self.uploader.queue[i].upload()
          self.toastr.success('successfully Uploaded!');
       }
      
    }


}