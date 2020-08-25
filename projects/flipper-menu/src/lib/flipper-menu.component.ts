import { Component, OnInit, Output, EventEmitter, ChangeDetectorRef, NgZone
} from '@angular/core';
import { trigger, transition, animate } from '@angular/animations';
import { Menu, Business, Branch, User, MenuEntries, PouchDBService, MainModelService, Tables,
   PouchConfig, ActiveUser, UserLoggedEvent, CurrentBranchEvent, BusinessesEvent, CurrentBusinessEvent, BranchesEvent } from '@enexus/flipper-components';
import { FlipperEventBusService } from '@enexus/flipper-event';
import { Router } from '@angular/router';
import { filter } from 'rxjs/operators';

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

  @Output() menuToggled: any = new EventEmitter<boolean>();
  @Output() switchedBusiness: any = new EventEmitter<Business>();
  @Output() switchedBranch: any = new EventEmitter<Branch>();
  @Output() routerClicked: any = new EventEmitter<any>();
  @Output() logoutUser: any = new EventEmitter<User>();

  businesses: Business[] = [];
  menus: Menu[] = [];
  settingMenus: Menu = null;
  branches: Branch[] = [];
  users: User;

  set menu(value: Menu[]) {
    this.menus = value;
  }
  get menu(): Menu[] {
    return this.menus;
  }


  set settingMenu(value: Menu) {
    this.settingMenus = value;
  }

  get settingMenu(): Menu {
    return this.settingMenus;
  }


  isOpen = false;
  canViewBranches = false;
  defaultBranch$: Branch = null;
  loggedUser: User = null;
  defaultBusiness$: Business = null;
  routerActive = '';
  data: MenuEntries = null;
  user: User = null;

  business$: Business[] = [];
  branches$: Branch[] = [];

  // loadAll

  allBusiness$: Business[] = [];
  allBranches$: Branch[] = [];

  user$: User = null;

  constructor(private database: PouchDBService,
              private model: MainModelService,
              private eventBus: FlipperEventBusService,
              private route: Router,
              private ref: ChangeDetectorRef,
              public activeUser: ActiveUser,
              private ngZone: NgZone) {
              this.database.connect(PouchConfig.bucket);

              this.eventBus.of < UserLoggedEvent > (UserLoggedEvent.CHANNEL)
                    .pipe(filter(e => e.user && e.user.id !== null ))
                    .subscribe(res =>
                    this.activeUser.currentUser = res.user);

              this.eventBus.of < BusinessesEvent > (BusinessesEvent.CHANNEL)
                    .pipe(filter(e => e.businesses && e.businesses.length > 0 ))
                    .subscribe(res =>
                    this.business$ = res.businesses);

              this.eventBus.of < CurrentBusinessEvent > (CurrentBusinessEvent.CHANNEL)
                        .subscribe(res =>
                          this.defaultBusiness$ = res.business);

              this.eventBus.of < BranchesEvent > (BranchesEvent.CHANNEL)
                           .pipe(filter(e => e.branches && e.branches.length > 0 ))
                        .subscribe(res =>
                          this.branches$ = res.branches);

              this.eventBus.of < CurrentBranchEvent > (CurrentBranchEvent.CHANNEL)
                        .subscribe(res =>
                          this.defaultBranch$ = res.branch);

                    }


    loadMenu() {
      this.menu = this.model.loadAll<Menu>(Tables.menu).filter(m => m.isSetting === false);
      this.settingMenu = this.model.loadAll<Menu>(Tables.menu).find(m => m.isSetting === true);
    }




  async ngOnInit() {

    this.loadMenu();

    await this.database.activeUser().then(res => {
        if (res.docs && res.docs.length > 0){
            this.eventBus.publish(new UserLoggedEvent(res.docs[0]));
        }
    });


    if (this.activeUser.currentUser){

       await this.database.query(['table', 'userId'], {
                  table: {$eq: 'businesses'},
                  userId: {$eq: this.activeUser.currentUser.id}
              }).then(res => {
        if (res.docs && res.docs.length > 0){
            this.eventBus.publish(new BusinessesEvent(res.docs));
        }
    });

        // defaultBusiness
       await this.database.activeBusiness(this.activeUser.currentUser.id).then(res => {
            if (res.docs && res.docs.length > 0){
                this.eventBus.publish(new CurrentBusinessEvent(res.docs[0]));
            }
        });

        // this.defaultBusiness$
       if (this.defaultBusiness$){
                await this.database.query(['table', 'businessId'], {
                                table: {$eq: 'branches'},
                                businessId: {$eq: this.defaultBusiness$.id}
                            }).then(res => {
                            if (res.docs && res.docs.length > 0){
                                this.eventBus.publish(new BranchesEvent(res.docs));
                            }
                  });


                await this.database.activeBranch(this.defaultBusiness$.id).then(res => {
                    if (res.docs && res.docs.length > 0){
                        this.eventBus.publish(new CurrentBranchEvent(res.docs[0]));
                    }
                });



        }

    }


    if (PouchConfig.canSync) {
      this.database.sync(PouchConfig.syncUrl);
    }
    // await this.database.getChangeListener().subscribe(data => {

    //   if (data && data.change && data.change.docs) {
    //     for (const doc of data.change.docs) {
    //       this.ngZone.run(() => {

    //         if (doc &&
    //           doc._id && doc._id === PouchConfig.Tables.user) {
    //           this.user$ = doc;
    //         }

    //         if (doc && this.user$ &&
    //           doc._id && doc._id === PouchConfig.Tables.business) {
    //            this.allBusiness$ = doc.businesses.filter(bus => bus.userId === this.user$.id);

    //         }

    //         if (doc && this.defaultBusiness$ &&
    //           doc._id && doc._id === PouchConfig.Tables.branches) {
    //             this.allBranches$ = doc.branches;

    //         }



    //       });
    //     }

    //     this.ref.detectChanges();
    //   }
    // });



    this.canViewBranches = false;
    this.ref.detectChanges();
  }




  toggle(): boolean {

    this.isOpen = !this.isOpen;
    this.menuToggled.emit(this.isOpen);
    return this.isOpen;
  }

  toggleBranches(): boolean {
    this.canViewBranches = !this.canViewBranches;
    return this.canViewBranches;
  }

  switchBusiness(business?: Business) {
    if (!business == null) {
      throw new Error('No current default business set.');
    }

    this.defaultBusiness$.active = false;
    this.database.put(PouchConfig.Tables.business + '_' + this.defaultBusiness$.id, this.defaultBusiness$);

    business.active = true;
    this.database.put(PouchConfig.Tables.business + '_' + business.id, business);

    this.ref.detectChanges();
  }

  switchBranch(branch: Branch) {

    if (!branch == null) {
      throw new Error('No current default business set.');
    }

    this.defaultBranch$.active = false;
    this.database.put(PouchConfig.Tables.branches + '_' + this.defaultBranch$.id, this.defaultBranch$);

    branch.active = true;
    this.database.put(PouchConfig.Tables.branches + '_' + branch.id, branch);


    this.ref.detectChanges();
  }

  router(menu: Menu, isSetting: boolean) {
    const menus: Menu[] = this.menu;
    const menuPusher: Menu[] = [];

    if (isSetting) {
      menus.filter(m => {
          m.active = false;
          menuPusher.push(m);
      });
      this.settingMenu.active = true;
    } else {
      menus.filter(m => {
        if (m.id === menu.id) {
          m.active = true;
        } else {
          m.active = false;
        }
        menuPusher.push(m);
      });

    }
    this.menu = menuPusher;
   // this.route.navigate([menu.route]);
  }

  hideBranchDropDown() {
    this.canViewBranches = false;
  }

  textEllipsis(str, maxLength, { side = 'end', ellipsis = '...' } = {}) {
    if (str.length > maxLength) {
      switch (side) {
        case 'start':
          return ellipsis + str.slice(-(maxLength - ellipsis.length));
        case 'end':
        default:
          return str.slice(0, maxLength - ellipsis.length) + ellipsis;
      }
    }
    return str;
  }
  logout() {
    this.logoutUser.emit(this.loggedUser);
  }
}
