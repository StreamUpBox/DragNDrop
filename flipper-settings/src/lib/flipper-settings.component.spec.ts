import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { FlipperSettingsComponent } from './flipper-settings.component'

describe('FlipperSettingsComponent', () => {
  let component: FlipperSettingsComponent
  let fixture: ComponentFixture<FlipperSettingsComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FlipperSettingsComponent],
    }).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(FlipperSettingsComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
