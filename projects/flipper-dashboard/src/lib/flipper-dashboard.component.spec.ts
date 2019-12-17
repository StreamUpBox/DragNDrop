import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlipperDashboardComponent } from './flipper-dashboard.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DashBoardEntries } from './dashboard-entries';
import { By } from '@angular/platform-browser';

const mocEntries: DashBoardEntries = {
total_store: {
value: '1,024,000',
percentage: 12,
since: 'last month'
},
gross_profit: {
value: '1,024,000',
percentage: 12,
since: 'last month'
},
net_profit: {
value: '1,024,000',
percentage: 12,
since: 'last month'
},
sold_items: [
{
id: 1,
name: 'Mineral Water',
updated_at: 'Updated 5m ago',
items: 100,
total: 5000
},
{
id: 2,
name: 'Salt',
updated_at: 'Updated 5m ago',
items: 100,
total: 5000
},
{
id: 3,
name: 'Vinegar',
updated_at: 'Updated 5m ago',
items: 100,
total: 5000
},
{
id: 4,
name: 'Blueband',
updated_at: 'Updated 5m ago',
items: 100,
total: 5000
}
],
selling_branches: [
{
id: 1,
name: 'Kimirongo',
updated_at: 'Updated 5m ago',
items: 100,
total: 5000
},
{
id: 2,
name: 'Kicukiro',
updated_at: 'Updated 5m ago',
items: 100,
total: 5000
},
{
id: 3,
name: 'Nyagatare',
updated_at: 'Updated 5m ago',
items: 100,
total: 5000
},
{
id: 4,
name: 'Gicumbi',
updated_at: 'Updated 5m ago',
items: 100,
total: 5000
},

]

};

describe('FlipperDashboardComponent', () => {
let component: FlipperDashboardComponent;
let fixture: ComponentFixture<FlipperDashboardComponent>;
const entries: DashBoardEntries = null;
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



it('should check if TOTAL STORE VALUE is not undefined', () => {
     expect(component.dashboardEntries.total_store).toBe(mocEntries.total_store);
});


it('should check if TOTAL STORE VALUE has got data', () => {
    fixture.detectChanges();
    const el = fixture.debugElement.query(By.css('#total-store')).nativeElement;
    const content = el.textContent;
    expect(content).toContain('Since', '');
  });



it('should check if GROSS PROFIT is not undefined', () => {
  expect(component.dashboardEntries.gross_profit).toBe(mocEntries.gross_profit);
});

it('should check if TOTAL GROSS PROFIT has got data', () => {
    fixture.detectChanges();
    const el = fixture.debugElement.query(By.css('#gross-profit')).nativeElement;
    const content = el.textContent;
    expect(content).toContain('Since', '');
  });

it('should check if NET PROFIT is not undefined', () => {
    expect(component.dashboardEntries.net_profit).toBe(mocEntries.net_profit);
  });

it('should check if TOTAL NET PROFIT has got data', () => {
      fixture.detectChanges();
      const el = fixture.debugElement.query(By.css('#net-profit')).nativeElement;
      const content = el.textContent;
      expect(content).toContain('Since', '');
    });

    // sold-items
it('should check if SOLD ITEMS is not undefined', () => {
      expect(component.dashboardEntries.sold_items).toBe(mocEntries.sold_items);
    });

it('should check if SOLD ITEMS has got data', () => {
        fixture.detectChanges();
        const el = fixture.debugElement.query(By.css('#sold-items')).nativeElement;
        const content = el.textContent;
        expect(content).toContain('Most Sold Items', '');
      });
//
it('should check if SELLING BRANCHES is not empty', () => {
        expect(component.dashboardEntries.sold_items).toBe(mocEntries.sold_items);
      });

it('should check if SELLING BRANCHES has got data', () => {
          fixture.detectChanges();
          const el = fixture.debugElement.query(By.css('#selling-branches')).nativeElement;
          const content = el.textContent;
          expect(content).toContain('Most Selling Branches', '');
        });

  });
