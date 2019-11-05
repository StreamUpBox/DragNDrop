import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Model, ModelFactory } from 'ngx-model';

@Injectable({
  providedIn: 'root'
})
export class MasterModelService {

  master$: Observable<any>;
  private model: Model<any>;
  constructor(private modelFactory: ModelFactory<any>) {
    this.create();
    this.master$ = this.model.data$;
   }
   public create(stateCreation:any={loading:false,items:[],categories:[],brands:[],branchs:[]}){
    this.model = this.modelFactory.create(stateCreation);
   }

   public get(){
       return this.model.get();
   }
   update(stateUpdates: any) {
    // retrieve raw model data
    const modelSnapshot = this.model.get();
    // mutate model data
    const newModel = { ...modelSnapshot, ...stateUpdates };
    // set new model data (after mutation)
    this.model.set(newModel);
    //console.log('mastering',this.model.get());
  }


}

