import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { trigger, transition, animate, state, style } from '@angular/animations';
import { MenuEntries } from './menu-entries';
import { Branch } from './branch';
import { User } from './user';
import { Business } from './business';
import { Menu } from './menu';

@Component({
  selector: 'flipper-menu',
  templateUrl: './flipper-menu.component.html',
  styleUrls: ['./flipper-menu.component.css'],
  animations: [
    trigger('toggleBox', [
      
      transition('open => closed', [
       animate('1500ms')
      ]),
      transition('closed => open', [
        animate('1000ms')
      ]),
    ])
  ]
})
export class FlipperMenuComponent implements OnInit {
 
  @Output() menuToggled:any = new EventEmitter<boolean>();
  @Output() switchedBusiness:any = new EventEmitter<Business>();
  @Output() switchedBranch:any = new EventEmitter<Branch>();
  

  @Input() menuEntries:MenuEntries;

  isOpen:boolean=false;
  canViewBranches:boolean=false;
  defaultBranch:Branch=null;
  loggedUser:User=null;
  branches:Branch[]=[];
  businesses:Business[]=[];
  menus:Menu[]=[];
  defaultBusiness:Business=null;
  constructor() { }

  ngOnInit() {
  //console.log(this.menuEntries);
  if(this.menuEntries){

    this.defaultBranch=this.menuEntries.branches.find(b=>b.active==true);
    this.defaultBusiness=this.menuEntries.businesses.find(b=>b.active==true);

    this.loggedUser=this.menuEntries.user?this.menuEntries.user:null;
    this.branches = this.menuEntries.branches.length > 0?this.menuEntries.branches:[];
    this.businesses = this.menuEntries.businesses.length > 0?this.menuEntries.businesses.filter(b=>b.active==false):[];
    this.menus = this.menuEntries.menu.length > 0?this.menuEntries.menu:[];
  }
  
  }

  toggle():boolean{
     this.isOpen=!this.isOpen;
     this.menuToggled.emit(this.isOpen);
     return this.isOpen;
  }
    toggleBranches():boolean{
        this.canViewBranches=!this.canViewBranches;
        return this.canViewBranches;
    }

    switchBusiness(business:Business){
     const current=this.defaultBusiness;
     current.active=false;
     business.active=true;

     this.defaultBusiness=business;
     this.businesses = this.businesses.filter((value,index,arr)=>{
      return value > business
     });
     this.businesses.push(current);
     this.switchedBusiness.emit(this.defaultBusiness);
    }

    switchBranch(branch:Branch){
     
      const current=this.defaultBranch;

      current.active=false;
      branch.active=true;

      this.defaultBranch=branch;
     
     this.switchedBranch.emit(this.defaultBranch);
     this.canViewBranches=false;
     }
}
