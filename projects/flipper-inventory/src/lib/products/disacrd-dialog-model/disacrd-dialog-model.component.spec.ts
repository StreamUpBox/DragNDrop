import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisacrdDialogModelComponent } from './disacrd-dialog-model.component';

describe('DisacrdDialogModelComponent', () => {
  let component: DisacrdDialogModelComponent;
  let fixture: ComponentFixture<DisacrdDialogModelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisacrdDialogModelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisacrdDialogModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
