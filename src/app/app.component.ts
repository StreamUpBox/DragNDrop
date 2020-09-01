import { Component } from '@angular/core';
import { trigger, transition, useAnimation } from '@angular/animations';
import {
   CalculateTotalClassPipe,
   MainModelService, Branch, Tables,
   Business, Taxes, PouchDBService, PouchConfig
} from '@enexus/flipper-components';
import { ModelService } from '@enexus/flipper-offline-database';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  public branch: Branch | null;

  constructor(private model: MainModelService,
    private database: PouchDBService,
    private query: ModelService, private totalPipe: CalculateTotalClassPipe) {
    
      this.database.connect(PouchConfig.bucket);
      if (PouchConfig.canSync) {
        this.database.sync(PouchConfig.syncUrl);
      }

      if(environment.initialData){
        console.log('initializing data');
        // this.branch = this.model.active<Branch>(Tables.branch);
        // this.init();
      
        let userId = this.database.uid();
        let businessId = this.database.uid();
        const user = {
          _id: '',
          name: 'Ganza',
          email: 'resp',
          token: 'dddd',
          active: true,
          createdAt: new Date(),
          updatedAt: new Date(),
          id: userId,
          userId: 1,
          expiresAt: 10000000,
          table: 'users',
          docId: PouchConfig.Tables.user
        };

        this.database.put(PouchConfig.Tables.user, user);

        const formBusinessData: Business = {
          id: businessId,
          name: 'Flipper',
          categoryId: '0',
          currency: 'RWF',
          country: 'Rwanda',
          businessUrl: '.flipper.rw',
          typeId: '0',
          timeZone: '0',
          userId: userId,
          active: true,
          createdAt: new Date(),
          updatedAt: new Date(),
          table: 'businesses',
          docId: PouchConfig.Tables.business
        };

        this.database.put(PouchConfig.Tables.business+'_'+formBusinessData.id, formBusinessData);
        this.model.create<Business>(Tables.business,formBusinessData);



        const formBranchData: Branch = {
          id: this.database.uid(),
          name: 'My Business',
          active: true,
          mapLatitude: -1,
          mapLongitude: 0,
          businessId: businessId,
          table: 'branches',
          docId: PouchConfig.Tables.branches

        };

        this.database.put(PouchConfig.Tables.branches+'_'+formBranchData.id, formBranchData);
        this.model.create<Branch>(Tables.branch,formBranchData);

        const formTaxes2 = {
          id: this.database.uid(),
          name: 'Vat',
          percentage: 18,
          businessId: businessId,
          active: true,
          isDefault: true,
          createdAt: new Date(),
          updatedAt: new Date(),
          table: 'taxes',
          docId: PouchConfig.Tables.taxes
        }



        this.database.put(PouchConfig.Tables.taxes+'_'+formTaxes2.id, formTaxes2);
        this.model.create<Taxes>(Tables.taxes,formTaxes2);


        const formTaxes1 =
        {
          id: this.database.uid(),
          name: 'no Tax',
          percentage: 0,
          businessId: formBusinessData.id,
          active: true,
          isDefault: false,
          createdAt: new Date(),
          updatedAt: new Date(),
          table: 'taxes',
          docId: PouchConfig.Tables.taxes
        };
        this.database.put(PouchConfig.Tables.taxes+'_'+formTaxes1.id, formTaxes1);
        this.model.create<Taxes>(Tables.taxes,formTaxes1);
      }else{
        console.log('done initializing data');
      }

  
  }
}