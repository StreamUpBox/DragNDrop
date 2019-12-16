import { Component } from '@angular/core';
import { MenuEntries } from 'flipper-menu/lib/menu-entries';
import { Router } from '@angular/router';
import { DashBoardEntries } from 'projects/flipper-dashboard/src/lib/dashboard-entries';
import { DialogSize } from 'projects/flipper-dialog/src/lib/dialog-size';
import { DialogComponent } from './dialog/dialog.component';
import { DialogService } from '@enexus/flipper-dialog';
import { OverlayContainer } from '@angular/cdk/overlay';


@Component({
selector: 'app-root',
templateUrl: './app.component.html',
styleUrls: ['./app.component.css']
})
export class AppComponent {

entries: MenuEntries;
//TODO: add an interface to implement from FlipperMenu so a developer to implement know which
//method to call as outPut!
dashboardentries:DashBoardEntries= {
total_store:{
value:'1,024,000',
percentage:12,
since:'last month'
},
gross_profit:{
value:'1,024,000',
percentage:12,
since:'last month'
},
net_profit:{
value:'1,024,000',
percentage:12,
since:'last month'
},
sold_items:[
{
id: 1,
name:'Mineral Water',
updated_at:'Updated 5m ago',
items:100,
total:5000
},
{
id: 2,
name:'Salt',
updated_at:'Updated 5m ago',
items:100,
total:5000
},
{
id: 3,
name:'Vinegar',
updated_at:'Updated 5m ago',
items:100,
total:5000
},
{
id: 4,
name:'Blueband',
updated_at:'Updated 5m ago',
items:100,
total:5000
}
],
selling_branches:[
{
id: 1,
name:'Kimirongo',
updated_at:'Updated 5m ago',
items:100,
total:5000
},
{
id: 2,
name:'Kicukiro',
updated_at:'Updated 5m ago',
items:100,
total:5000
},
{
id: 3,
name:'Nyagatare',
updated_at:'Updated 5m ago',
items:100,
total:5000
},
{
id: 4,
name:'Gicumbi',
updated_at:'Updated 5m ago',
items:100,
total:5000
},

]

};
constructor(private router: Router,private dialogs: DialogService,overlayContainer: OverlayContainer) {
  overlayContainer.getContainerElement().classList.add('unicorn-dark-theme');
this.allEntries();

}
displayMenuToggled(event) {
//console.log(event);
}
canLogoutUser(event) {
console.log(event);
}
//switchedBusiness

displaySwitchedBusiness(event) {
//console.log(event);
}
displaySwitchedBranch(event) {
//console.log(event);
}

getRouterClicked(event) {
return this.router.navigate([event.router]);
}


allEntries(): MenuEntries {
this.entries = {
user: {
id: 1,
name: 'Ganza respice',
email: 'respinho2014@gmail.com'
},
businesses: [
{
id: 1,
name: 'Progress Pharamcy',
active: true,
},
{
id: 2,
name: 'My Shop',
active: false,
},
{
id: 3,
name: 'Dom',
active: false,
},
{
id: 4,
name: 'Gy',
active: false,
}
],
branches: [
{
id: 1,
name: 'Kimironko branch',
active: true,
},
{
id: 2,
name: 'Nyamata branch',
active: false,
},
{
id: 3,
name: 'KCT branch',
active: false,
},
{
id: 4,
name: 'City center branch',
active: false,
},
],
menu: [
{
id: 1,
name: 'Analytics',
icon: 'analytics.svg',
route: 'analytics',
active: true,
},
{
id: 2,
name: 'Inventory',
icon: 'inventory.svg',
route: 'inventory',
active: false,
},
{
id: 3,
name: 'Inventory Count',
icon: 'inventory-count.svg',
route: 'inventory-count',
active: false,
},
{
id: 4,
name: 'Orders',
icon: 'order.svg',
route: 'order',
active: false,
},
{
id: 5,
name: 'Settings',
icon: 'settings.svg',
route: 'settings',
active: false,
}
]

}

return this.entries;

}
handleClic(){
console.log("a button got a click!!!");
}


public compare() {
    this.dialogs.open(DialogComponent, DialogSize.SIZE_MD, {
    left:'80px',
      results: [],
    }).subscribe(res=>console.log(res));
    // this.dialogs.wait({
    //     title:'Loafing..',
    //     progress: 40,
    //   });
    // this.dialogs.confirm('My app','Ging booming').subscribe(res=>console.log(res));

  // this.dialogs.delete('My app',[]).subscribe(res=>console.log(res));
  }
}
