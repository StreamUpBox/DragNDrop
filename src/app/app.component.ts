import {
  Component
} from '@angular/core';
import { ModelService } from '@enexus/flipper-offline-database';
import {Branch, Business, Taxes, PouchConfig,
   PouchDBService, CurrentBusinessEvent, CurrentBranchEvent, BusinessesEvent,
    BranchesEvent, DefaultTaxesEvent, TaxesEvent, MigrateService } from '@enexus/flipper-components';
import { FlipperEventBusService } from '@enexus/flipper-event';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  {
  constructor(private eventBus: FlipperEventBusService,
              private migrate: MigrateService,
              private model: ModelService,
              private database: PouchDBService) {
this.database.connect(PouchConfig.bucket);
if (PouchConfig.canSync) {
      this.database.sync(PouchConfig.syncUrl);
    }

this.database.getChangeListener().subscribe(data => {
      console.log(data);
    });

this.migrate.products();
this.migrate.variants();
this.migrate.stocks();
    // this.migrate.stockHistories();
    // this.business();
    // this.taxes();
    // this.branch();
  }

  public  business() {
     this.database.get(PouchConfig.Tables.business).then(res => {

        this.eventBus.publish(new BusinessesEvent(res.businesses));
        const currentBusiness: Business = res.businesses.find(business => business.active);
        this.eventBus.publish(new CurrentBusinessEvent(currentBusiness));

    }, error => {
        if (error.error && error.status === '404' ||  error.status === 404) {
          this.eventBus.publish(new CurrentBusinessEvent(null));
        }
    });

  }

  public  branch() {
     this.database.get(PouchConfig.Tables.branches).then(res => {

      this.eventBus.publish(new BranchesEvent(res.branches));

      const currentBranch: Branch = res.branches.find(branch => branch.active);
      this.eventBus.publish(new CurrentBranchEvent(currentBranch));

    }, error => {
        if (error.error && error.status === '404' ||  error.status === 404) {
          this.eventBus.publish(new CurrentBranchEvent(null));
          this.eventBus.publish(new BranchesEvent([]));
        }
    });

  }

  public  taxes() {
     this.database.get(PouchConfig.Tables.taxes).then(res => {
      this.eventBus.publish(new TaxesEvent(res.taxes));

      const defaultTax: Taxes = res.taxes.find(tax => tax.isDefault === true);
      this.eventBus.publish(new DefaultTaxesEvent(defaultTax));

    }, error => {
        if (error.error && error.status === '404' ||  error.status === 404) {
          this.eventBus.publish(new DefaultTaxesEvent(null));
          this.eventBus.publish(new TaxesEvent([]));
        }
    });

  }
}


