import { FlipperComponentsModule } from './../../../../flipper-components/src/lib/components.module';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FlipperBasicPosComponent } from './flipper-basic-pos.component';

describe('FlipperBasicPosComponent', () => {
  let component: FlipperBasicPosComponent;
  let fixture: ComponentFixture<FlipperBasicPosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FlipperComponentsModule],
      declarations: [FlipperBasicPosComponent ]
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
});
