import { FlipperComponentsModule } from './../../../../flipper-components/src/lib/components.module';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FlipperBasicPosComponent } from './flipper-basic-pos.component';
import { SearchBoxComponent } from '../common/search-box/search-box.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { VendorsModule } from '@enexus/flipper-vendors';
import { AutocompleteComponent } from '../common/autocomplete/autocomplete.component';

describe('FlipperBasicPosComponent', () => {
  let component: FlipperBasicPosComponent;
  let fixture: ComponentFixture<FlipperBasicPosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FlipperComponentsModule,
        FormsModule,
        ReactiveFormsModule,
        VendorsModule],
      declarations: [FlipperBasicPosComponent,SearchBoxComponent,AutocompleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlipperBasicPosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should receive and set input gottenProduct', () => {
    component.gottenProduct = ['java'];
    expect(component.gottenProduct).toEqual(['java']);
  });

  it('should emit the output value that will use to search a product', () => {
   let  event='ganza';

   component.searchEmitValue.subscribe(g => {
      expect(g).toEqual('ganza');
     // done();
   });
   component.searchPosProduct(event);
  });

});
