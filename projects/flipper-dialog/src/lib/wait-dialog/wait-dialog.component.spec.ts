
import {WaitDialogComponent} from './wait-dialog.component';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { WaitDialogProgress } from '@enexus/flipper-dialog/lib/wait-dialog/wait-dialog-progress';
export const dialogRefSpy = () => jasmine.createSpyObj('MatDialogRef', ['close']);
describe('WaitDialogComponent', () => {
  let component: WaitDialogComponent;
  let fixture: ComponentFixture<WaitDialogComponent>;
  let progress: WaitDialogProgress;

  beforeEach(async(() => {
    progress = {
      title: 'title',
      progress: 50
    };
    TestBed.configureTestingModule({
      declarations: [WaitDialogComponent],
      providers: [
        {provide: MAT_DIALOG_DATA, useValue: progress},
        {provide: MatDialogRef, useValue: dialogRefSpy()},
      ]
    })
      .overrideTemplate(WaitDialogComponent, '')
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WaitDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get progress', () => {
    expect(component.progress).toEqual(progress);
  });

  it('should set progress', () => {
    const progressBis: WaitDialogProgress = {
      title: 't2',
      progress: 42
    };
    component.progress = progressBis;
    expect(component.progress).toEqual(progressBis);
  });
});
