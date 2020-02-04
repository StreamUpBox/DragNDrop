import { Component, OnInit, AfterViewInit } from '@angular/core';
import {
  Business, Branch, ILatLng, MainModelService, UserBusiness,
  Tables, Types, User, BusinessCategory,
  NotificationService, SettingsService} from '@enexus/flipper-components';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
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
  categories$: BusinessCategory[] = [];
  hasBusiness: Business;
  user: User = null;
  currencies: any[] = [];
  countries: any[] = [];
  timezones: any[] = [];
  origin: ILatLng = {
    latitude: 0,
    longitude: 0
  };
  constructor(private setting: SettingsService, private router: Router, protected notificationSvc: NotificationService,
              private formBuilder: FormBuilder, private model: MainModelService) {
               this.getLocation();
  }



  getLocation() {
    if ('geolocation' in navigator) {
      console.log('Location services available');
      navigator.geolocation.getCurrentPosition( (position) => {
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
  ngOnInit() {
    this.getLocation();

    this.countries = this.setting.countries();
    this.currencies = this.setting.currencies();
    this.timezones = this.setting.timezones();

    this.hasBusiness = this.model.active<Business>(Tables.business);
    this.user = this.model.active<User>(Tables.user);
    this.types$ = this.model.loadAll<Types>(Tables.type);


    this.registerForm = this.formBuilder.group({
      typeId: ['', Validators.required],
      businessCategoryId: ['', Validators.required],
      name: ['', Validators.required],
      branchName: ['My Business', Validators.required],
      currency: [this.currencies[0].symbol, Validators.required],
      country: [this.countries[0], Validators.required],
      timeZone: [this.timezones[0].utc[0], Validators.required],
    }
    );
    this.model.active<Business>(Tables.business);

  }




  get f() { return this.registerForm.controls; }

  getBusinessCategory(id: number) {
    this.categories$ = this.model.filters<BusinessCategory>(Tables.businessCategory, 'typeId', id);
  }



  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      this.notificationSvc.error('Create Business', 'We need you to complete all of the required fields before we can continue');
      return;
    }



    const formBusinessData: Business = {
      name: this.registerForm.value.name,
      categoryId: parseInt(this.registerForm.value.businessCategoryId, 10),
      currency: this.registerForm.value.currency,
      country: this.registerForm.value.country,
      businessUrl: this.registerForm.value.name + '.flipper.rw',
      typeId: parseInt(this.registerForm.value.typeId, 10),
      timeZone: this.registerForm.value.timeZone,
      syncedOnline: false,
      active: true,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    // LET CREATE BUSINESS

    const createdBusiness: any = this.model.create<Business>(Tables.business, formBusinessData);

    const formBranchData: Branch = {
      name: this.registerForm.value.branchName,
      active: true,
      mapLatitude: this.origin.latitude,
      mapLongitude: this.origin.longitude,
      syncedOnline: false,
      businessId: createdBusiness ?
        parseInt(createdBusiness.id, 10) : 0

    };
    // LET CREATE BRANCH AFTER BUINSESS CREATED

    this.model.create<Branch>(Tables.branch, formBranchData);

    const formUserBusinesData: UserBusiness = {
      userId: this.user ? this.user.id : 0,
      syncedOnline: false,
      businessId: createdBusiness
        ? parseInt(createdBusiness.id, 10) : 0

    };

    this.model.create<UserBusiness>(Tables.userBusiness, formUserBusinesData);
    if (this.hasBusiness) {
      this.hasBusiness.active = false;
      this.model.update<Business>(Tables.business, this.hasBusiness, this.hasBusiness.id);
    }

    setTimeout(() => {

      this.notificationSvc.success('Create Business', 'Business ' + formBusinessData.name + ' created successfully!');

      return this.router.navigate(['/admin']);


    }, 1);

  }

  onReset() {
    this.submitted = false;
    this.registerForm.reset();
  }



}
