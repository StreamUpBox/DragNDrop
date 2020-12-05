import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { FlipperDashboardComponent } from './flipper-dashboard.component'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { By } from '@angular/platform-browser'
import { FlipperComponentsModule, DashBoardEntries } from '@enexus/flipper-components'

const mocEntries: DashBoardEntries = {
  totalStore: {
    value: '1,024,000',
    percentage: 12,
    since: 'last month',
  },
  grossProfit: {
    value: '1,024,000',
    percentage: 12,
    since: 'last month',
  },
  netProfit: {
    value: '1,024,000',
    percentage: 12,
    since: 'last month',
  },
  soldItems: [
    {
      id: 1,
      name: 'Mineral Water',
      updatedAt: 'Updated 5m ago',
      items: 100,
      total: 5000,
    },
    {
      id: 2,
      name: 'Salt',
      updatedAt: 'Updated 5m ago',
      items: 100,
      total: 5000,
    },
    {
      id: 3,
      name: 'Vinegar',
      updatedAt: 'Updated 5m ago',
      items: 100,
      total: 5000,
    },
    {
      id: 4,
      name: 'Blueband',
      updatedAt: 'Updated 5m ago',
      items: 100,
      total: 5000,
    },
  ],
  sellingBranches: [
    {
      id: 1,
      name: 'Kimirongo',
      updatedAt: 'Updated 5m ago',
      items: 100,
      total: 5000,
    },
    {
      id: 2,
      name: 'Kicukiro',
      updatedAt: 'Updated 5m ago',
      items: 100,
      total: 5000,
    },
    {
      id: 3,
      name: 'Nyagatare',
      updatedAt: 'Updated 5m ago',
      items: 100,
      total: 5000,
    },
    {
      id: 4,
      name: 'Gicumbi',
      updatedAt: 'Updated 5m ago',
      items: 100,
      total: 5000,
    },
  ],
}

describe('FlipperDashboardComponent', () => {
  let component: FlipperDashboardComponent
  let fixture: ComponentFixture<FlipperDashboardComponent>
  const entries: DashBoardEntries = null
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [BrowserAnimationsModule, FlipperComponentsModule],
      declarations: [FlipperDashboardComponent],
    }).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(FlipperDashboardComponent)
    component = fixture.componentInstance
    component.dashboardEntries = mocEntries
    fixture.detectChanges()
  })

  it('should check if TOTAL STORE VALUE is not undefined', () => {
    expect(component.dashboardEntries.totalStore).toBe(mocEntries.totalStore)
  })

  it('should check if TOTAL STORE VALUE has got data', () => {
    fixture.detectChanges()
    const el = fixture.debugElement.query(By.css('#total-store')).nativeElement
    const content = el.textContent
    expect(content).toContain('Since', '')
  })

  it('should check if GROSS PROFIT is not undefined', () => {
    expect(component.dashboardEntries.grossProfit).toBe(mocEntries.grossProfit)
  })

  it('should check if TOTAL GROSS PROFIT has got data', () => {
    fixture.detectChanges()
    const el = fixture.debugElement.query(By.css('#gross-profit')).nativeElement
    const content = el.textContent
    expect(content).toContain('Since', '')
  })

  it('should check if NET PROFIT is not undefined', () => {
    expect(component.dashboardEntries.netProfit).toBe(mocEntries.netProfit)
  })

  it('should check if TOTAL NET PROFIT has got data', () => {
    fixture.detectChanges()
    const el = fixture.debugElement.query(By.css('#net-profit')).nativeElement
    const content = el.textContent
    expect(content).toContain('Since', '')
  })

  // sold-items
  it('should check if SOLD ITEMS is not undefined', () => {
    expect(component.dashboardEntries.soldItems).toBe(mocEntries.soldItems)
  })

  it('should check if SOLD ITEMS has got data', () => {
    fixture.detectChanges()
    const el = fixture.debugElement.query(By.css('#sold-items')).nativeElement
    const content = el.textContent
    expect(content).toContain('Most Sold Items', '')
  })
  //
  it('should check if SELLING BRANCHES is not empty', () => {
    expect(component.dashboardEntries.soldItems).toBe(mocEntries.soldItems)
  })

  it('should check if SELLING BRANCHES has got data', () => {
    fixture.detectChanges()
    const el = fixture.debugElement.query(By.css('#selling-branches')).nativeElement
    const content = el.textContent
    expect(content).toContain('Most Selling Branches', '')
  })
})
