// import { TestBed, async, ComponentFixture } from '@angular/core/testing';
// import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
// import { By } from '@angular/platform-browser';

// describe('AppComponent', () => {
//   let component: AppComponent;
//   let fixture: ComponentFixture<AppComponent>;

//   beforeEach(async(() => {
//     TestBed.configureTestingModule({
//       imports: [
//         RouterTestingModule
//       ],
//       declarations: [
//         AppComponent
//       ],
//     }).compileComponents();
//   }));
  
  
//   beforeEach(() => {
//     fixture = TestBed.createComponent(AppComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create the app', () => {
//     const fixture = TestBed.createComponent(AppComponent);

//     const app = fixture.debugElement.componentInstance;
//     expect(app.getName()).toBe("hello");

//     const buttonDE = fixture.debugElement.query( By.css( '.inc-btn' ) );
    
//      // WHEN - Simulate the user input event and detect changes.
//      buttonDE.triggerEventHandler( 'click', {} );
//      fixture.detectChanges();
 
//      // THEN - Assert change in component's state
//      expect( component.increment ).toEqual( 1 );

//     expect(app).toBeTruthy();
//   });

//   // it(`should have as title 'fli'`, () => {
//   //   const fixture = TestBed.createComponent(AppComponent);
//   //   const app = fixture.debugElement.componentInstance;
//   //   expect(app.title).toEqual('fli');
//   // });


//   // it('should render title', () => {
//   //   const fixture = TestBed.createComponent(AppComponent);
//   //   fixture.detectChanges();
//   //   const compiled = fixture.debugElement.nativeElement;
//   //   expect(compiled.querySelector('.content span').textContent).toContain('fli app is running!');
//   });


import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';


describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppComponent ]
    })
    .compileComponents();
  }));
  

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should increment',()=>{
    const app = fixture.debugElement.componentInstance;
   
    const buttonDE = fixture.debugElement.query( By.css( '.inc-btn' ) );
    
//      // WHEN - Simulate the user input event and detect changes.
     buttonDE.triggerEventHandler( 'click', {} );
     fixture.detectChanges();
 
//      // THEN - Assert change in component's state

     expect( component.clickCounter ).toEqual( 5 ); 
  })
});

