import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FileUploader } from 'ng2-file-upload';
import { Observable, of } from 'rxjs';
import { UploadedFilelistModalComponent } from './uploaded-filelist-modal/uploaded-filelist-modal.component';
import { ToastrService } from 'ngx-toastr';

//const URL = "https://ufile.io/";
const URL = 'https://evening-anchorage-3159.herokuapp.com/api/'; 

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})

export class FileUploadComponent implements OnInit {
  hasBaseDropZoneOver:boolean;
  visible:boolean;
  loadingPercent = 0;
  intervalId = {} as any;
  isStart = false;
  res: Observable<null | string> = of(null);
  response:any;  
  count!: number | 0;
  fileCount!: number | 0;

  public uploader: FileUploader = new FileUploader({
    url: URL,
    disableMultipart : false,
    autoUpload: true,
    method: 'post',
    itemAlias: 'attachment',
    allowedFileType: ['image', 'pdf']    
    });
  
  constructor(public dialog: MatDialog,private toaster:ToastrService)
  { 
    this.hasBaseDropZoneOver = false;
    this.visible=false;   
  }

  ngOnInit(): void {
    this.fileCount=this.uploader.queue.length;
    console.log("ng init value",this.fileCount);
  }

  openToaster() {       //open toaster message
      this.toaster.warning('Please select correct file format','Warning',{positionClass:'toast-top-right',
      messageClass:'warning-msg-toaster'}); 
  }

  public fileOverBase(e:any):void { 
        this.hasBaseDropZoneOver = e;
  }

  public FileDrop() // event after file drop called to check file type
  { 
    var check= this.uploader.queue.length;
    this.checkFileType(check)
    this.startLoading();     
  }
  
  public onFileSelected($event: any){     
    var check= this.uploader.queue.length;
    this.checkFileType(check)
    this.startLoading();        
  }

  checkFileType(check: number)
  { 
    if (check > this.fileCount)
    {
      this.fileCount=this.uploader.queue.length;
    } else if(check==this.fileCount)
    {
    console.log("open toaster check, filecount",check,this.fileCount);
     this.openToaster();
    } 
  }

  startLoading() {
    this.isStart = true;
    this.intervalId = setInterval(() => {
      if (this.loadingPercent < 100) {
        this.loadingPercent += 1;
      }
    }, 10);
  }
  
  onRemoveFileClick()
  {
    this.visible=!this.visible;
  }

  openDialog() :void
  {
    const dialogRef=this.dialog.open(UploadedFilelistModalComponent,{
      width: '1142px',
      height: '528px'      
    });
    
    let data: { id:Number|0 ; filename: string | undefined; size: any; type: string | undefined; }[] =[] ;
    console.log("uploader file path",this.uploader.queue);       
    this.count=0;
    this.uploader.queue.forEach(item =>
      { 
        var filetype=item.file.name?.split('?')[0].split('.').pop();
        
        switch(filetype)
       {        
           case "png":  item.file.type="PNG File"; break;
           case "jpg": item.file.type="JPG File"; break;
           case "jpeg": item.file.type="JPEG File"; break;  
           case "svg" : item.file.type="SVG File"; break;        
           case "pdf" : item.file.type="Microsoft Edge PDF Document"; break;
       }

       this.count = this.count + 1;

       data.push({
       id:this.count,
       filename : item.file.name,       
       size: item.file.size,
       type:item.file.type       
      });
    });
    
    dialogRef.componentInstance.fromParent=data;
  }
}
  