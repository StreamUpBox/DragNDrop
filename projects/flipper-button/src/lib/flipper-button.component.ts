import { Component, OnInit, Input, Output } from '@angular/core';

@Component({
  selector: 'flipper-button',
  templateUrl: './flipper-button.component.html',
  styleUrls: ['./flipper-button.component.css']
})
export class FlipperButtonComponent implements OnInit {
  @Input() buttonColor: string;
  @Input() buttonConfig: any;
  @Input() displayText: string;
  @Input() btn_shape: any;

  styleConfig = {
    success: {
      position: 'relative',
      width: '65px',
      height: '22px',
      fontFamily: 'Heebo',
      fontSize: '15px',
      fontWeight: 'normal',
      fontStretch: 'normal',
      fontStyle: 'normal',
      lineHeight: 'normal',
      letterSpacing: 'normal',
      color: '#ffffff',
    },
    danger: {
      position: 'relative',
      width: '150px',
      height: '60px',
      border: 'solid 1px #dc3545',
      backgroundColor: '#dc3545',
      color: '#fff',
      fontFamily: 'sans-serif',
      boxShadow: 'inset 1px 1px 0 0 rgba(255, 255, 255, 0.2)',
      borderRadius: '100px',
      marginTop: '30px',
      webkitTransitionDuration: '0.4s',
      transitionDuration: '0.4s',
      textDecoration: 'none',
      overflow: 'hidden',
      cursor: 'pointer',
    },
    primary: {
      position: 'relative',
      width: '150px',
      height: '60px',
      backgroundColor: '#dc3545',
      color: '#fff',
      fontFamily: 'sans-serif',
      fontSize: '20px',
      borderRadius: '',
      marginTop: '30px',
      webkitTransitionDuration: '0.4s',
      transitionDuration: '0.4s',
      textDecoration: 'none',
      overflow: 'hidden',
      cursor: 'pointer',
    },
    warning: {
      position: 'relative',
      width: '150px',
      height: '60px',
      backgroundColor: '#ffc107',
      color: '#fff',
      fontFamily: 'sans-serif',
      fontSize: '20px',
      borderRadius: '',
      marginTop: '30px',
      webkitTransitionDuration: '0.4s',
      transitionDuration: '0.4s',
      textDecoration: 'none',
      overflow: 'hidden',
      cursor: 'pointer',
    },
    info: {
      position: 'relative',
      width: '95px',
      height: '42px',
      fontFamily: 'Heebo',
      fontSize: '15px',
      fontStretch: 'normal',
      fontStyle: 'normal',
      lineHeight: 'normal',
      letterSpacing: 'normal',
      color: '#0093ee',
      borderRadius: '6px',
      border: 'solid 1px #0093ee',
      backgroundColor: '#e1ebf5',
      fontWeight: '500',
      padding: '5px',
    },
    // info_Img:{
    // width:'300%',
    // },
    white: {
      position: 'relative',
      width: '150px',
      height: '60px',
      border: 'solid 1px #0093ee',
      backgroundColor: '#FFFFFF',
      color: '#0093ee',
      fontFamily: 'sans-serif',
      fontSize: '20px',
      borderRadius: '10px',
      marginTop: '30px',
      webkitTransitionDuration: '0.4s',
      transitionDuration: '0.4s',
      textDecoration: 'none',
      overflow: 'hidden',
      cursor: 'pointer',
    },

  }
  constructor() { }

  ngOnInit() {
    if (this.buttonConfig.buttonStyle.shape == 'circle' && this.buttonConfig.buttonStyle.width == '' && this.buttonConfig.buttonStyle.height == '') {
      this.styleConfig[this.buttonConfig.buttonStyle.fp_btn_type].borderRadius = "50%";
      this.styleConfig[this.buttonConfig.buttonStyle.fp_btn_type].width = "60px";
      this.styleConfig[this.buttonConfig.buttonStyle.fp_btn_type].height = "60px";

    }
    if (this.buttonConfig.buttonStyle.shape == 'circle' && this.buttonConfig.buttonStyle.width != '' && this.buttonConfig.buttonStyle.height != '') {
      this.styleConfig[this.buttonConfig.buttonStyle.fp_btn_type].borderRadius = "50%";
      this.styleConfig[this.buttonConfig.buttonStyle.fp_btn_type].width = "60px";
      this.styleConfig[this.buttonConfig.buttonStyle.fp_btn_type].height = "60px";
    }
    if (this.buttonConfig.buttonStyle.width != '') {
      this.styleConfig[this.buttonConfig.buttonStyle.fp_btn_type].width =
        this.buttonConfig.buttonStyle.width;
    }
    if (this.buttonConfig.buttonStyle.height != '') {
      this.styleConfig[this.buttonConfig.buttonStyle.fp_btn_type].height =
        this.buttonConfig.buttonStyle.height;
    }
    if (this.buttonConfig.buttonStyle.shape != '' &&
      this.buttonConfig.buttonStyle.height != '') {
      this.styleConfig[this.buttonConfig.buttonStyle.fp_btn_type].borderRadius = "50%";
      this.styleConfig[this.buttonConfig.buttonStyle.fp_btn_type].height = this.buttonConfig.buttonStyle.height;
      this.styleConfig[this.buttonConfig.buttonStyle.fp_btn_type].width = this.buttonConfig.buttonStyle.height;
    }
    if (this.buttonConfig.buttonStyle.shape == 'circle'
      && this.buttonConfig.buttonStyle.width != '') {
      this.styleConfig[this.buttonConfig.buttonStyle.fp_btn_type].borderRadius = "50%";
      this.styleConfig[this.buttonConfig.buttonStyle.fp_btn_type].width = this.buttonConfig.buttonStyle.width;
      this.styleConfig[this.buttonConfig.buttonStyle.fp_btn_type].height = this.buttonConfig.buttonStyle.width;
    }

  }
}
