import { Component, OnInit, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import {
  Business, Branch, ILatLng, Types, User, BusinessCategory,
  NotificationService, SettingsService, Taxes, PouchDBService,
  PouchConfig, Tables, MainModelService
} from '@enexus/flipper-components';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'flipper-create-update-business',
  templateUrl: './create-update-business.component.html',
  styleUrls: ['./create-update-business.component.css']
})
export class CreateUpdateBusinessComponent implements OnInit, AfterViewInit {
  registerForm: FormGroup;
  submitted = false;
  types$: Types[] = [];
  taxes$: Taxes[] = [];

  categories$: BusinessCategory[] = [];
  searchCategoryByTypes$: BusinessCategory[] = [];
  isCategoryFound = false;
  business$: Business[] = [];
  branches$: Branch[] = [];
  user$: User = null;
  currencies: any[] = [];
  countries: any[] = [];
  timezones: any[] = [];
  origin: ILatLng = {
    latitude: 0,
    longitude: 0
  };
  constructor(private database: PouchDBService,
    private setting: SettingsService,
    private router: Router,
    protected notificationSvc: NotificationService,
    private formBuilder: FormBuilder,
    private model: MainModelService,
    private ref: ChangeDetectorRef) {
    this.getLocation();
    
    //  PouchConfig.bucket hardcoded to be main.
    this.database.connect(PouchConfig.bucket); //keep the name of the bucket is main for all
  }



  getLocation() {
    if ('geolocation' in navigator) {
      console.log('Location services available');
      navigator.geolocation.getCurrentPosition((position) => {
        this.origin.latitude = position.coords.latitude;
        this.origin.longitude = position.coords.longitude;
      });
    } else {
      console.log('Location Services not available!');
    }
  }


  ngAfterViewInit(): void {
    this.getLocation();
  }
  async ngOnInit() {
    this.getLocation();

    this.types$ = this.model.loadAll<Types>(Tables.type);
    this.categories$ = this.model.loadAll<BusinessCategory>(Tables.businessCategory);

    if (PouchConfig.canSync) {
      this.database.sync(PouchConfig.syncUrl);
    }

    this.countries = this.setting.countries();
    this.currencies = this.setting.currencies();
    this.timezones = this.setting.timezones();

    this.registerForm = this.formBuilder.group({
      typeId: ['', Validators.required],
      businessCategoryId: ['', Validators.required],
      name: ['', Validators.required],
      branchName: ['My Business', Validators.required],
      currency: [this.currencies[0].symbol, Validators.required],
      country: [this.countries[0], Validators.required],
      timeZone: [this.timezones[0].utc[0], Validators.required],
      id: this.database.uid()
    });

    this.database.get(PouchConfig.Tables.user).then(result => {
      if (result) {
        this.user$ = result;
      }
    }, error => {
      // console.error(error);
    });

  


    this.ref.detectChanges();

  }


  get f() { return this.registerForm.controls; }

  async getBusinessCategory(id: string) {

    this.searchCategoryByTypes$ = [];
    await this.categories$.forEach(cat => {

      const catTypeId = typeof cat.typeId === 'string' ? cat.typeId : cat.typeId;
      const typeId = typeof id === 'string' ? id : id;
      if (catTypeId === typeId) {
        this.searchCategoryByTypes$.push(cat);
      }
    });

    this.ref.detectChanges();

  }



  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      this.notificationSvc.error('Create Business', 'We need you to complete all of the required fields before we can continue');
      return;
    }



    const formBusinessData: Business = {
      id: this.registerForm.value.id,
      name: this.registerForm.value.name,
      categoryId: this.registerForm.value.businessCategoryId,
      currency: this.registerForm.value.currency,
      country: this.registerForm.value.country,
      businessUrl: this.registerForm.value.name + '.flipper.rw',
      typeId: this.registerForm.value.typeId,
      timeZone: this.registerForm.value.timeZone,
      userId: this.user$ ? this.user$.id : 0,
      active: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    // LET CREATE BUSINESS
    formBusinessData.active = false;
    this.database.put(PouchConfig.Tables.business, formBusinessData);



    const formBranchData: Branch = {
      id: this.database.uid(),
      name: this.registerForm.value.branchName,
      active: true,
      mapLatitude: this.origin.latitude,
      mapLongitude: this.origin.longitude,
      businessId: this.registerForm.value.id

    };
    // LET CREATE BRANCH AFTER BUINSESS CREATED
    formBranchData.active = false;
    this.database.put(PouchConfig.Tables.branches, formBranchData);



    const formTaxes1 =
    {
      id: this.database.uid(),
      name: 'no Tax',
      percentage: 0,
      businessId: this.registerForm.value.id,
      active: true,
      isDefault: false,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const formTaxes2 = {
      id: this.database.uid(),
      name: 'Vat',
      percentage: 18,
      businessId: this.registerForm.value.id,
      active: true,
      isDefault: true,
      createdAt: new Date(),
      updatedAt: new Date()
    }


    this.database.put(PouchConfig.Tables.taxes, formTaxes1);
    this.database.put(PouchConfig.Tables.taxes, formTaxes2);
    



    setTimeout(() => {
      this.notificationSvc.success('Create Business', 'Business ' + formBusinessData.name + ' Created successfully!');
      this.router.navigate(['/admin']);
    }, 100);

  }

  onReset() {
    this.submitted = false;
    this.registerForm.reset();
  }



}
