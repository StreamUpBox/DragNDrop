import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { NgOfflineDbComponent } from './ng-offline-db.component'

describe('NgOfflineDbComponent', () => {
  let component: NgOfflineDbComponent
  let fixture: ComponentFixture<NgOfflineDbComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NgOfflineDbComponent],
    }).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(NgOfflineDbComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
