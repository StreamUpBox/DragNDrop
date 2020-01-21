import { Component, OnInit } from '@angular/core';
import {
  Business, Branch, MainModelService, UserBusiness,
  Tables, Types, User, BusinessCategory,
  NotificationService
} from '@enexus/flipper-components';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'flipper-create-update-business',
  templateUrl: './create-update-business.component.html',
  styleUrls: ['./create-update-business.component.css']
})
export class CreateUpdateBusinessComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;
  types$: Observable<Types[]>;
  categories$: Observable<BusinessCategory[]>;
  hasBusiness: Business;
  user: User = null;
  constructor(private router: Router, protected notificationSvc: NotificationService,
              private formBuilder: FormBuilder, private model: MainModelService) {
  }

  ngOnInit() {
    this.hasBusiness = this.model.active<Business>(Tables.business);
    this.user = this.model.active<User>(Tables.user);
    this.types$ = this.model.loadAll(Tables.type);


    this.registerForm = this.formBuilder.group({
      typeId: ['', Validators.required],
      businessCategoryId: ['', Validators.required],
      name: ['', Validators.required],
      branchName: ['', Validators.required],
      currency: ['', Validators.required],
      country: ['', Validators.required],
    }
    );
    this.model.active<Business>(Tables.business);
  }


  get f() { return this.registerForm.controls; }

  getBusinessCategory(id) {
    this.categories$ = this.model.filters(Tables.businessCategory, 'typeId', id);
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
      active: true,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    // LET CREATE BUSINESS

    const createdBusiness: any = this.model.create<Business>(Tables.business, formBusinessData);

    const formBranchData: Branch = {
      name: this.registerForm.value.branchName,
      active: true,
      businessId: createdBusiness ?
        parseInt(createdBusiness.id, 10) : 0

    };
    // LET CREATE BRANCH AFTER BUINSESS CREATED

    this.model.create<Branch>(Tables.branch, formBranchData);

    const formUserBusinesData: UserBusiness = {
      userId: this.user ? this.user.id : 0,
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


    }, 200);

  }

  onReset() {
    this.submitted = false;
    this.registerForm.reset();
  }



}
