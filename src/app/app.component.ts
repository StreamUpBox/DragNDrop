import { Component, OnDestroy } from '@angular/core';
import { MenuEntries } from 'flipper-menu/lib/menu-entries';
import { Router } from '@angular/router';
import { DashBoardEntries } from 'projects/flipper-dashboard/src/lib/dashboard-entries';
import { DialogSize } from 'projects/flipper-dialog/src/lib/dialog-size';
import { DialogComponent } from './dialog/dialog.component';

import { OverlayContainer } from '@angular/cdk/overlay';
import { FlipperEventBusService } from 'projects/flipper-event/src/public_api';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { OrderEvent } from './order-event';
import { DialogService } from 'projects/flipper-dialog/src/public_api';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy {

  entries: MenuEntries;
  // TODO: add an interface to implement from FlipperMenu so a developer to implement know which
  // method to call as outPut!
  dashboardentries: DashBoardEntries = {
    totalStore: {
      value: '1,024,000',
      percentage: 12,
      since: 'last month'
    },
    grossProfit: {
      value: '1,024,000',
      percentage: 12,
      since: 'last month'
    },
    netProfit: {
      value: '1,024,000',
      percentage: 12,
      since: 'last month'
    },
    soldItems: [
      {
        id: 1,
        name: 'Mineral Water',
        updatedAt: 'Updated 5m ago',
        items: 100,
        total: 5000
      },
      {
        id: 2,
        name: 'Salt',
        updatedAt: 'Updated 5m ago',
        items: 100,
        total: 5000
      },
      {
        id: 3,
        name: 'Vinegar',
        updatedAt: 'Updated 5m ago',
        items: 100,
        total: 5000
      },
      {
        id: 4,
        name: 'Blueband',
        updatedAt: 'Updated 5m ago',
        items: 100,
        total: 5000
      }
    ],
    sellingBranches: [
      {
        id: 1,
        name: 'Kimirongo',
        updatedAt: 'Updated 5m ago',
        items: 100,
        total: 5000
      },
      {
        id: 2,
        name: 'Kicukiro',
        updatedAt: 'Updated 5m ago',
        items: 100,
        total: 5000
      },
      {
        id: 3,
        name: 'Nyagatare',
        updatedAt: 'Updated 5m ago',
        items: 100,
        total: 5000
      },
      {
        id: 4,
        name: 'Gicumbi',
        updatedAt: 'Updated 5m ago',
        items: 100,
        total: 5000
      },

    ]

  };
  private selectedSubscription: Subscription;
  constructor(private eventBus: FlipperEventBusService, private router: Router, private dialogs: DialogService, overlayContainer: OverlayContainer) {
    overlayContainer.getContainerElement().classList.add('unicorn-dark-theme');
    this.allEntries();

   

    this.selectedSubscription = this.eventBus.of<OrderEvent>(OrderEvent.CHANNEL)
    .pipe(filter(event =>event.order.id===100))
    .subscribe(event =>console.log(event));
   

}
public newOrder(){
  this.eventBus.publish(new OrderEvent({id:100,orderno:'#O100',reference:'#0100-kigali'}));
}
public updateOrder(){
  this.eventBus.publish(new OrderEvent({id:100,orderno:'#O120',reference:'#0100-Rwanda'}));
}
isMenuToggled(event) {
//console.log(event);
}
canLogoutUser(event) {
console.log(event);
}
//switchedBusiness



  displaySwitchedBusiness(event) {
    // console.log(event);
  }
  displaySwitchedBranch(event) {
    // console.log(event);
  }

  getRouterClicked(event) {
    return this.router.navigate([event.router]);
  }

  ngOnDestroy() {
    this.selectedSubscription.unsubscribe();
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

    };

    return this.entries;

  }
  handleClic() {
    console.log('a button got a click!!!');
  }


public anyDialog(data:[]) {
    this.dialogs.open(DialogComponent, DialogSize.SIZE_MD, {
      results: data,
    }).subscribe(res=>console.log(res));

  }


  // DialogSize {
  //   SIZE_SM = 'dialog-sm',
  //   SIZE_MD = 'dialog-md',
  //   SIZE_LG = 'dialog-lg',
  //   SIZE_FULL = 'dialog-full'
  // }
 
 
public deleteDialogMessage(itemToDelete:[]) {

    this.dialogs.delete('Product',itemToDelete).subscribe(res=>console.log(res));
}

public confirmDialogMessage() {

  this.dialogs.confirm('Product','Do you want to delete this product').subscribe(res=>console.log(res));

}
public waitDialog(){
  this.dialogs.wait({title:'',progress:12});
}

}