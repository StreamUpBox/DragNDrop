import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { FlipperMenuComponent, FlipperMenuModule } from 'flipper-menu';
import { VendorsModule } from '@enexus/flipper-vendors';
import { FlipperEventModule } from 'projects/flipper-event/src/public_api';
import { FlipperPosModule } from 'projects/flipper-pos/src/public-api';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DialogModule } from 'projects/flipper-dialog/src/public_api';
import { ColorModule } from 'projects/flipper-color/src/public_api';
import { FontModule } from 'projects/flipper-font/src/public_api';
import { FlipperComponentsModule } from '@enexus/flipper-components';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        VendorsModule,
        FlipperMenuModule,
        FlipperEventModule,
        FlipperPosModule,
        FlipperComponentsModule,
        DialogModule,
        ColorModule,
        FontModule,
        BrowserAnimationsModule
      ],
      declarations: [
        AppComponent,

      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should emit the searchPosProduct value', () => {
    const event = 'java';
    component.searchPosProduct(event);
    component.gottenProduct = event;
    expect(component.gottenProduct).toEqual('java');
  });

});
