import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KeyBoardShortCutsComponent } from './key-board-short-cuts.component';

describe('KeyBoardShortCutsComponent', () => {
  let component: KeyBoardShortCutsComponent;
  let fixture: ComponentFixture<KeyBoardShortCutsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KeyBoardShortCutsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KeyBoardShortCutsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
