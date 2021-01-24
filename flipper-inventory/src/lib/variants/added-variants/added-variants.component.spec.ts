import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { AddedVariantsComponent } from './added-variants.component'

describe('AddedVariantsComponent', () => {
  let component: AddedVariantsComponent
  let fixture: ComponentFixture<AddedVariantsComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AddedVariantsComponent],
    }).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(AddedVariantsComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
