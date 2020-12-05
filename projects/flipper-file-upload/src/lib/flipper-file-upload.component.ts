import { Component, Output, EventEmitter, Input, OnInit, AfterViewInit } from '@angular/core'
import { DomSanitizer } from '@angular/platform-browser'

@Component({
  selector: 'flipper-file-upload',
  templateUrl: 'flipper-file-upload.component.html',
  styleUrls: ['flipper-file-upload.component.css'],
})
export class FlipperFileUploadComponent implements OnInit, AfterViewInit {
  @Input() activeColor = 'green'
  @Input() baseColor = '#ccc'
  @Input() overlayColor = 'rgba(255,255,255,0.5)'
  @Input() baseWidth = '300'
  @Input() baseHeight = '300'
  @Input() baseTitle = 'Add Image'
  @Input() baseImage: string

  dragging = false
  loaded = false
  imageLoaded = false
  imageSrc: any = ''
  borderColor: string
  iconColor: string

  @Output() imageUploaded: any = new EventEmitter<string>()

  constructor(private domSanitizer: DomSanitizer) {}

  ngOnInit() {
    this.imageSrc = this.baseImage ? this.domSanitizer.bypassSecurityTrustUrl(this.baseImage) : ''
    this.loaded = this.imageSrc ? true : false
  }
  ngAfterViewInit(): void {
    this.imageSrc = this.baseImage ? this.domSanitizer.bypassSecurityTrustUrl(this.baseImage) : ''
    this.loaded = this.imageSrc ? true : false
  }

  handleDragEnter() {
    this.dragging = true
  }

  handleDragLeave() {
    this.dragging = false
  }

  handleDrop(e) {
    e.preventDefault()
    this.dragging = false
    this.handleInputChange(e)
  }

  handleImageLoad() {
    this.imageLoaded = true
    this.iconColor = this.overlayColor
  }

  handleInputChange(e) {
    const file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0]

    const pattern = /image-*/
    const reader = new FileReader()

    if (!file.type.match(pattern)) {
      alert('invalid format')
      return
    }

    this.loaded = false

    reader.onload = this.handleReaderLoaded.bind(this)
    reader.readAsDataURL(file)
  }

  handleReaderLoaded(e) {
    const reader = e.target
    this.imageSrc = this.domSanitizer.bypassSecurityTrustUrl(reader.result)
    this.loaded = true
    this.imageUploaded.emit(this.imageSrc.changingThisBreaksApplicationSecurity)
  }

  setActive() {
    this.borderColor = this.activeColor
    if (this.imageSrc.length === 0) {
      this.iconColor = this.activeColor
    }
  }

  setInactive() {
    this.borderColor = this.baseColor
    if (this.imageSrc.length === 0) {
      this.iconColor = this.baseColor
    }
  }

  cancel() {
    this.imageSrc = this.baseImage
    this.imageUploaded.emit('')
  }
}
