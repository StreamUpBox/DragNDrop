import { Component, OnInit, Output, EventEmitter, ChangeDetectorRef, NgZone
} from '@angular/core';
import { trigger, transition, animate } from '@angular/animations';
import { Menu, Business, Branch, User, MenuEntries, PouchDBService, MainModelService, Tables,
   PouchConfig } from '@enexus/flipper-components';
import { Router } from '@angular/router';

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
    private route: Router,
    private ref: ChangeDetectorRef,
              private ngZone: NgZone) {
    this.database.connect(PouchConfig.bucket);
  }



  loadMenu() {
    this.menu = this.model.loadAll<Menu>(Tables.menu).filter(m => m.isSetting === false);
    this.settingMenu = this.model.loadAll<Menu>(Tables.menu).find(m => m.isSetting === true);
  }

  async ngOnInit() {
    this.loadMenu();

    if (PouchConfig.canSync) {
      this.database.sync(PouchConfig.syncUrl);
    }
    await this.database.getChangeListener().subscribe(data => {

      if (data && data.change && data.change.docs) {
        for (const doc of data.change.docs) {
          this.ngZone.run(() => {

            if (doc &&
              doc._id && doc._id === PouchConfig.Tables.user) {
              this.user$ = doc;
            }

            if (doc && this.user$ &&
              doc._id && doc._id === PouchConfig.Tables.business) {
               this.allBusiness$ = doc.businesses.filter(bus => bus.userId === this.user$.id);
               this. updateBusiness();
               this.updateBranch();
            }

            if (doc && this.defaultBusiness$ &&
              doc._id && doc._id === PouchConfig.Tables.branches) {
                this.allBranches$ = doc.branches;
                this.updateBranch();
            }



          });
        }

        this.ref.detectChanges();
      }
    });

    this.database.get(PouchConfig.Tables.user).then(result => {
      if (result) {
        this.user$ = result;
      }
    }, error => {
      console.error(error);
    });

    this.database.get(PouchConfig.Tables.business).then(result => {
      if (result && this.user$) {
        this.allBusiness$ = result.businesses.filter(bus => bus.userId === this.user$.id);
        this. updateBusiness();
      }
    }, error => {
      console.error(error);
    });

    this.database.get(PouchConfig.Tables.branches).then(result => {
      if (result && this.defaultBusiness$) {
        this.allBranches$ = result.branches;
        this.updateBranch();

      }
    }, error => {
      console.error(error);
    });

    await this.getUser();
    await this.getBusiness();
    await this.getBranches();
    await this.getDefaultBranch();
    await this.getDefaultBusiness();

    this.canViewBranches = false;
    this.ref.detectChanges();
  }

  private updateBusiness() {
    this.business$ = this.allBusiness$.filter(bus => bus.active === false);
    this.defaultBusiness$ = this.allBusiness$.find(b => b.active === true);
    this.switchedBusiness.emit(this.defaultBusiness$);
  }

  private updateBranch() {
    this.branches$ = this.allBranches$.filter(branch => branch.businessId === this.defaultBusiness$.id && branch.active === false);
    this.defaultBranch$ = this.allBranches$.find(b => b.businessId === this.defaultBusiness$.id && b.active === true);
    this.switchedBranch.emit(this.defaultBranch$);
  }

  public async getBusiness() {
    return await Object.assign({}, this.business$);
  }
  public async getUser() {
    return await Object.assign({}, this.user$);
  }

  public async getBranches() {
    return await Object.assign({}, this.branches$);
  }

  public async getDefaultBranch() {
    return await Object.assign({}, this.defaultBranch$);
  }

  public async getDefaultBusiness() {
    return await Object.assign({}, this.defaultBusiness$);
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
    const businesses: Business[] = [];
    this.allBusiness$.forEach(bus => {
      if (bus.id === business.id) {
        bus.active = true;
      } else {
        bus.active = false;
      }
      businesses.push(bus);
    });

    this.canViewBranches = false;
    this.allBusiness$ = businesses;
    this.database.put(PouchConfig.Tables.business, { businesses: this.allBusiness$ });
    this.updateBusiness();
    this.updateBranch();

    this.ref.detectChanges();
  }

  switchBranch(branch: Branch) {

    if (!branch == null) {
      throw new Error('No current default business set.');
    }
    const branches: Branch[] = [];
    this.allBranches$.forEach(bus => {
      if (this.defaultBusiness$.id === bus.businessId) {
        if (bus.id === branch.id) {
          bus.active = true;
        } else {
          bus.active = false;
        }
      }
      branches.push(bus);

    });
    this.allBranches$ = branches;
    this.database.put(PouchConfig.Tables.branches, { branches: this.allBranches$ });
    this.updateBranch();

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
