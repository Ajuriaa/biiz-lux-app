import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ButtonsModule, HeaderModule } from 'src/app/shared';
import { MaterialModule } from 'src/app/material';
import { ForgotSomethingComponent } from './forgot-something.component';

describe('ForgotSomethingComponent', () => {
  let component: ForgotSomethingComponent;
  let fixture: ComponentFixture<ForgotSomethingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ForgotSomethingComponent],
      imports: [HeaderModule, ButtonsModule, RouterModule, MaterialModule, BrowserAnimationsModule],
      providers: [{ provide: ActivatedRoute, useValue: { params: ({})}}]
    });
    fixture = TestBed.createComponent(ForgotSomethingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
