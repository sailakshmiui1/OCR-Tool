import { Component,
  ElementRef,
  Input,
  OnInit,
  VERSION,
  ViewChild } from '@angular/core';
 import { BehaviorSubject } from 'rxjs';
//import { ImageViewerConfig,CustomImageEvent } from '@hreimer/angular-image-viewer/public-api';

@Component({
  selector: 'app-preview-screen-popup',
  templateUrl: './preview-screen-popup.component.html',
  styleUrls: ['./preview-screen-popup.component.scss']
})
export class PreviewScreenPopupComponent  implements OnInit{
  isZoomed = false;
  pos = { top: 0, left: 0, x: 0, y: 0 };
  
  condition :any;
  fileType: any;
  images: any;
  isActive :boolean=false ;
  nextAngle = 0;



  @ViewChild('container') 'container': ElementRef;
  @ViewChild('img') 'img': ElementRef;
  @Input() fromParent : any;
  
  
  ngOnInit() {   
     console.log('fromparent fietype from preview screen', this.fromParent);
    // if(this.fileType=='Micorosoft Word Document')
    this.fileType=this.fromParent;
    
    if(this.fileType =="Image File")
    {
      this.isActive = true;
    } 
    
    this.images="https://i.natgeofe.com/n/d4492040-e42e-4c0b-9604-3b1ddea67f88/FInal-Submission_NJG_4x3.jpg"
    // this.condition=this.fromParent;
  }

 

  onRotateRight(e)
    { 
      let num = this.getNextAngle();
      this.img.nativeElement.style.transform ="rotate("+num+"deg)";
     // console.log("native element", this.img.nativeElement);
    }

  getNextAngle() {
    this.nextAngle += 90;    
    if(this.nextAngle >= 360) {
      this.nextAngle = 0;       
  }
  return this.nextAngle;
}



  onClickZoomIn(e) {
    console.log(e.clientY, e.clientX);
    this.isZoomed = !this.isZoomed;
    if (this.isZoomed) {     
      this.container.nativeElement.style.overflow = 'hidden';
      this.img.nativeElement.style.width = '40%';
      this.img.nativeElement.style.marginLeft="265px";
      this.img.nativeElement.style.cursor = 'zoom-in';
    }
  }

  onClickZoomOut(e) {
    this.isZoomed = !this.isZoomed;
    if (this.isZoomed) {
      this.container.nativeElement.style.overflow = 'hidden';
      this.img.nativeElement.style.width = '80%';
      this.img.nativeElement.style.marginLeft="60px";
      this.img.nativeElement.style.cursor = 'zoom-out';
      this.img.nativeElement.style.cursor = 'zoom-out';
      this.img.nativeElement.style.left = `-${e.clientX}`;
      this.img.nativeElement.style.top = `-${e.clientY}`;
    }
  }

  
  onConvert(e)
   {

   }
  
}


