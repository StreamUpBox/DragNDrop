import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { CreateUpdateBusinessComponent } from './create-update-business.component'

describe('CreateUpdateBusinessComponent', () => {
  let component: CreateUpdateBusinessComponent
  let fixture: ComponentFixture<CreateUpdateBusinessComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CreateUpdateBusinessComponent],
    }).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateUpdateBusinessComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
