##
# flipper plugins
##
flipper Dashboard

install
````
npm install @enexus/flipper-dashboard
````
````
<flipper-dashboard [dashboardEntries]="dashboardentries"></flipper-dashboard>
````
- Dashboardentries is required intries for dashboard
- Example of dashboardentries object of data should look like this.
````
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
````
Listening on flipper-dashboard events

````
No event to listen to
````
##
flipper Menu
````
````

##
flipper-color
install
````
npm install @enexus/flipper-color
````
For example you can call colorToTextClass with color to be green
````
<div [ngClass]="['green' | colorToTextClass]">
  Message
 </div>
````
````
<div [ngClass]="['blue' | colorToBackgroundClass]">
  Message
 </div>
````
````
<div [ngClass]="['red' | colorToFillClass]">
  Message
</div>
````
All available flipper-colors
````
 'error' | 'warn' | 'success' | 'info' | 'primary' | 'accent' | 'background' | 'foreground' | 'highlight' | 'muted' | "green" | "blue" | "purple-1" | "purple-2" | "purple-3" | "red";
````
## flipper-fonts
install
````
npm i @enexus/flipper-font
````
import module
````
FontModule
````
````
<div [ngClass]="['bold' | fontWeightClass]">
  Message
</div>
````
````
<div [ngClass]="['sm' | fontSizeClass]">
  Message
</div>
````
available fonts sizes:
````
'sm' | 'md' | 'lg' | 'xs' | '26' | '24' | '28' | '32';
````
available fonts weight:
````
'italic' | 'bold' | '400' | '600' | '700' | '800' | '500'
````
##flipper-vendors
install
````
npm i @enexus/flipper-vendors
````
Import module
````
VendorsModule
````
## flipper-buttons
install
````
npm install --save enexus@flipper-button
````
````
<flipper-button
    color="blue|green|dark"
    shape="circle|default"
    icon="nameOfIcon"
    height="20px"
    width="20px"
></flipper-button>
````
##flipper-menu
install
````
npm i @enexus/flipper-menu
````
Module
````
FlipperMenuModule
````
````
<flipper-menu 
[menuEntries]="entries" 
(menuToggled)="isMenuToggled($event)" 
(switchedBusiness)="displaySwitchedBusiness($event)" 
(switchedBranch)="displaySwitchedBranch($event)"
(logoutUser)="didUserLoggedOut($event)" 
(routerClicked)="getRouterClicked($event)" 
 >
 </flipper-menu>
````
Example of menu object.
````
MenuEntries {
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
}
````
##flipper-dialog
install
````
npm i @enexus/flipper-dialog
````
Service
````
DialogService
````
- Options
````
delete|confirm|open|wait
````
- Interface
````
DialogSize
````

the name of icon should be defied inside your application asset files.
the library does not ship with the icon itself.
