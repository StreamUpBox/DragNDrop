import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { VariantsDialogModelComponent } from './variants-dialog-model.component'

describe('VariantsDialogModelComponent', () => {
  let component: VariantsDialogModelComponent
  let fixture: ComponentFixture<VariantsDialogModelComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [VariantsDialogModelComponent],
    }).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(VariantsDialogModelComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
