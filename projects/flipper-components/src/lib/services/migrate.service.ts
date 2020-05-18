import { Injectable } from '@angular/core';
import { ModelService } from '@enexus/flipper-offline-database';
import { PouchDBService } from './pouchdb.service';
import { PouchConfig, Tables } from '../db-config';
import { 
    User, Business, Branch, Taxes, BranchProducts,
    BusinessCategory, Product,
    Variant, Stock, 
    StockHistory, Order, OrderDetails } from '../entries';

export interface MigrateConfig {
    PouchTable:string,
    SqlTable:string,
    Key?:string,
    isArray:boolean,
    keyId:string
  }

@Injectable({
    providedIn: 'root'
  })

export class MigrateService {

    public constructor(
        private database: PouchDBService,
        private model:ModelService) 
        {
            this.database.connect(PouchConfig.bucket);
        }

     public insertDataIntoAlsql<T>(Table:string,data:T,id:string){
        if(!this.model.find<T>(Table,id)){
          this.model.create<T>(Table,[data]);
        }else{
          this.model.update<T>(Table,data,id); 
        }
      }

      public user() { 
         return this.builder<User>({
              PouchTable:PouchConfig.Tables.user,
              SqlTable:Tables.user,
              isArray:false,
              keyId:'id'
          });
      }

      // Business

      public businesses() {
        return this.builder<Business>({
            PouchTable:PouchConfig.Tables.business,
            SqlTable:Tables.business,
            isArray:true,
            Key:'businesses',
            keyId:'id'
        });
     
      }

      // Branches

      public branches(){
        return this.builder<Branch>({
            PouchTable:PouchConfig.Tables.branches,
            SqlTable:Tables.branch,
            isArray:true,
            Key:'branches',
            keyId:'id'
        });
      }

      public taxes(){
        return this.builder<Taxes>({
            PouchTable:PouchConfig.Tables.taxes,
            SqlTable:Tables.taxes,
            isArray:true,
            Key:'taxes',
            keyId:'id'
        });

      }

      public businessTypes(){
        return this.builder<any>({
            PouchTable:PouchConfig.Tables.businessTypes,
            SqlTable:Tables.type,
            isArray:true,
            Key:'businessTypes',
            keyId:'id'
        });
      }

      public branchProducts(){
        return this.builder<BranchProducts>({
            PouchTable:PouchConfig.Tables.branchProducts,
            SqlTable:Tables.branchProducts,
            isArray:true,
            Key:'branchProducts',
            keyId:'id'
        });
      }

      public businessCategories(){
        return this.builder<BusinessCategory>({
            PouchTable:PouchConfig.Tables.businessCategories,
            SqlTable:Tables.businessCategory,
            isArray:true,
            Key:'businessCategories',
            keyId:'id'
        });
      }
      public products(){
        return this.builder<Product>({
            PouchTable:PouchConfig.Tables.products,
            SqlTable:Tables.products,
            isArray:true,
            Key:'products',
            keyId:'id'
        });
      }
      public variants(){
        return this.builder<Variant>({
            PouchTable:PouchConfig.Tables.variants,
            SqlTable:Tables.variants,
            isArray:true,
            Key:'variants',
            keyId:'id'
        });
      }
      public stocks(){
        return this.builder<Stock>({
            PouchTable:PouchConfig.Tables.stocks,
            SqlTable:Tables.stocks,
            isArray:true,
            Key:'stocks',
            keyId:'id'
        });
      }

      public stockHistories(){
        return this.builder<StockHistory>({
            PouchTable:PouchConfig.Tables.stockHistories,
            SqlTable:Tables.stockHistory,
            isArray:true,
            Key:'stockHistory',
            keyId:'id'
        });
      }

      public orders(){
        return this.builder<Order>({
            PouchTable:PouchConfig.Tables.orders,
            SqlTable:Tables.order,
            isArray:true,
            Key:'orders',
            keyId:'id'
        });
      }

      public orderDetails(){
        return this.builder<OrderDetails>({
            PouchTable:PouchConfig.Tables.orderDetails,
            SqlTable:Tables.orderDetails,
            isArray:true,
            Key:'orderDetails',
            keyId:'id'
        });
      }

      private builder<T>(config:MigrateConfig):Promise<T>{
                return new Promise((resolve, reject) => {

                
                    this.database.get(config.PouchTable)
                    .then(result => {
                            if(config.isArray){
                                const data:T[]=result[config.Key] as T[];
                                    if (result && data.length > 0) {
                                        data.forEach(row=>{
                                                const form:T = row as T;
                                                  this.insertDataIntoAlsql<T>(config.SqlTable,form,form[config.keyId] as string);
                                        }); 
                                    }

                            }else{
                                    if (result) {
                                        const form:T= result as T;
                                        this.insertDataIntoAlsql<T>(config.SqlTable,form,form[config.keyId]);
                                    }
                            }
                        resolve();
                        }, error => { console.error(error);reject(); });

                    });
       }
      

}
