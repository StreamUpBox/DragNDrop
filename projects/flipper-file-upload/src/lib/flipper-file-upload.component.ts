import { Component, Output, EventEmitter } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'flipper-file-upload',
  templateUrl: 'flipper-file-upload.component.html',
    styleUrls: ['flipper-file-upload.component.css'],
    inputs:['activeColor','baseColor','overlayColor','baseWidth','baseHeight','baseTitle','baseImage']
})
export class FlipperFileUploadComponent  {
  activeColor: string = 'green';
  baseColor: string = '#ccc';
  overlayColor: string = 'rgba(255,255,255,0.5)';
  baseWidth:string='300';
  baseHeight:string='300';
  baseTitle:string="Add Image";
  baseImage:string='';

  dragging: boolean = false;
  loaded: boolean = false;
  imageLoaded: boolean = false;
  imageSrc: any = this.baseImage?this.baseImage:'';
  borderColor: string;
  iconColor: string;
  
  @Output() imageUploaded: any = new EventEmitter<string>();
  
  constructor(private domSanitizer: DomSanitizer) {
  }

  handleDragEnter() {
      this.dragging = true;
  }
  
  handleDragLeave() {
      this.dragging = false;
  }
  
  handleDrop(e) {
      e.preventDefault();
      this.dragging = false;
      this.handleInputChange(e);
  }
  
  handleImageLoad() {
      this.imageLoaded = true;
      this.iconColor = this.overlayColor;
  }

  handleInputChange(e) {
      var file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];

      var pattern = /image-*/;
      var reader = new FileReader();

      if (!file.type.match(pattern)) {
          alert('invalid format');
          return;
      }

      this.loaded = false;

      reader.onload = this.handleReaderLoaded.bind(this);
      reader.readAsDataURL(file);
  }
  
  handleReaderLoaded(e) {
      var reader = e.target;
      this.imageSrc = this.domSanitizer.bypassSecurityTrustUrl(reader.result);
      this.loaded = true;
      this.imageUploaded.emit(this.imageSrc.changingThisBreaksApplicationSecurity);
  }
  
  setActive() {
      
      this.borderColor = this.activeColor;
      if (this.imageSrc.length === 0) {
          this.iconColor = this.activeColor;
      }
  }
  
  setInactive() {
      this.borderColor = this.baseColor;
      if (this.imageSrc.length === 0) {
          this.iconColor = this.baseColor;
      }
  }
  
  cancel(){
         this.imageSrc=this.baseImage;
         this.imageUploaded.emit('')
  }
  
}
  
