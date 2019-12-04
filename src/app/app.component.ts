import { Component } from '@angular/core';
import { MenuEntries } from 'flipper-menu/lib/menu-entries';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
 entries:MenuEntries;

    constructor() {
      this.allEntries();
    }
    displayMenuToggled(event){
      
      console.log(event);
    }

  //switchedBusiness

  displaySwitchedBusiness(event){
    //console.log(event);
  }
  displaySwitchedBranch(event){
    console.log(event);
  }
    allEntries():MenuEntries{
      this.entries={
        user:{
          id:1,
          name:'Ganza respice',
          email:'respinho2014@gmail.com'
        },
        businesses:[
          {
            id:1,
            name:'Progress Pharamcy',
            active:true,
          },
          {
            id:2,
            name:'My Shop',
            active:false,
          }
        ],
        branches:[
          {
            id:1,
            name:'Kimironko branch',
            active:true,
          },
          {
            id:2,
            name:'Nyamata branch',
            active:false,
          },
          {
            id:3,
            name:'KCT branch',
            active:false,
          },
          {
            id:4,
            name:'City center branch',
            active:false,
          },
        ],
        menu:[
          {
            id:1,
            name:'Analytics',
            icon:'i',
            route:'analytics',
            active:true,
          },
          {
            id:2,
            name:'Inventory',
            icon:'i',
            route:'inventory',
            active:false,
          },
          {
            id:3,
            name:'Inventory Count',
            icon:'i',
            route:'inventory-count',
            active:false,
          },
          {
            id:4,
            name:'Orders',
            icon:'i',
            route:'order',
            active:false,
          }
        ]
        
      }

      return this.entries;
       
    }

}
