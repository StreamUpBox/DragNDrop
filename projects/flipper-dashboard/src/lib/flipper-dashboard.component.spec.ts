import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlipperDashboardComponent } from './flipper-dashboard.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DashBoardEntries } from './dashboard-entries';

let mocEntries:DashBoardEntries={
total_store:{
value:'1,024,000',
percentage:12,
since:'last month'
},
gross_profit:{
value:'1,024,000',
percentage:12,
since:'last month'
},
net_profit:{
value:'1,024,000',
percentage:12,
since:'last month'
},
sold_items:[
{
id: 1,
name:'Mineral Water',
updated_at:'Updated 5m ago',
items:100,
total:5000
},
{
id: 2,
name:'Salt',
updated_at:'Updated 5m ago',
items:100,
total:5000
},
{
id: 3,
name:'Vinegar',
updated_at:'Updated 5m ago',
items:100,
total:5000
},
{
id: 4,
name:'Blueband',
updated_at:'Updated 5m ago',
items:100,
total:5000
}
],
selling_branches:[
{
id: 1,
name:'Kimirongo',
updated_at:'Updated 5m ago',
items:100,
total:5000
},
{
id: 2,
name:'Kicukiro',
updated_at:'Updated 5m ago',
items:100,
total:5000
},
{
id: 3,
name:'Nyagatare',
updated_at:'Updated 5m ago',
items:100,
total:5000
},
{
id: 4,
name:'Gicumbi',
updated_at:'Updated 5m ago',
items:100,
total:5000
},

]

};

describe('FlipperDashboardComponent', () => {
let component: FlipperDashboardComponent;
let fixture: ComponentFixture<FlipperDashboardComponent>;

  beforeEach(async(() => {
  TestBed.configureTestingModule({
  imports: [BrowserAnimationsModule],
  declarations: [FlipperDashboardComponent]
  })
  .compileComponents();
  }));

  beforeEach(() => {

  fixture = TestBed.createComponent(FlipperDashboardComponent);
  component = fixture.componentInstance;
  component.dashboardEntries = mocEntries;
  fixture.detectChanges();
  });

 

// it('should check if TOTAL STORE VALUE has data',()=>{
//   const el = fixture.nativeElement;
//   expect(el
//     .querySelector('#total-store') !== null)
//     .toBe(true);
// });

it('should lists 4 sold items',()=>{
  const el = fixture.nativeElement;
  let items = el.querySelector('#sold-items');
  expect(items.length).toBe(4);
  });

  it('should create', () => {
  expect(component).toBeTruthy();
  });
  });
