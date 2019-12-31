
import {DeleteDialogComponent} from './delete-dialog.component';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import { ComponentFixture, async, TestBed } from '@angular/core/testing';
export const dialogRefSpy = () => jasmine.createSpyObj('MatDialogRef', ['close']);

describe('DeleteDialogComponent', () => {
  let component: DeleteDialogComponent;
  let fixture: ComponentFixture<DeleteDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DeleteDialogComponent],
      providers: [
        {provide: MAT_DIALOG_DATA, useValue: {name: 'name', items: ['item']}},
        {provide: MatDialogRef, useValue: dialogRefSpy()},
      ]
    })
      .overrideTemplate(DeleteDialogComponent, '')
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
