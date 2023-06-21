import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PreviewScreenPopupComponent } from '../preview-screen-popup/preview-screen-popup.component';


@Component({
  selector: 'app-uploaded-filelist-modal',
  templateUrl: './uploaded-filelist-modal.component.html',
  styleUrls: ['./uploaded-filelist-modal.component.scss']
})
export class UploadedFilelistModalComponent implements OnInit { 
  currentDate=Date.now();
  @Input() fromParent: any;  
  displayedColumns: string[] = [ 'name', 'date','type', 'size','action'];
  dataSource: any;
  count: any;

constructor(public dialog: MatDialog)
{}

ngOnInit(): void {
 // console.log("fromParent data",this.fromParent);  
  this.dataSource=this.fromParent;
}

openDialogBox(name:string) :void
{
  console.log(" event value", name);
  var type=name?.split('?')[0].split('.').pop();
  var filetype:string;    
  switch(type)
 {        
     //case "docx": case "doc": filetype="Micorosoft Word Document"; break;
     case "png": case "jpg": case "jpeg": case "svg": filetype="Image File"; break;      
    // case "txt": filetype="Text Document"; break;
     case "pdf" : filetype="Microsoft Edge PDF Document"; break;
     //case "xls" : case "xlsx" : filetype="Microsoft Excel Worksheet"; break;
     
 }

 let data =filetype;

  const dialogRef=this.dialog.open(PreviewScreenPopupComponent,{
    width: '1142px',
    height: '528px'    
  });

  dialogRef.componentInstance.fromParent =data;
}

removeData(id :number){
  this.dataSource = this.dataSource.filter((u: { id: number; }) => u.id !== id);
 }

 closeModal()
 {  
  this.dialog.closeAll();
 }  
 
}






