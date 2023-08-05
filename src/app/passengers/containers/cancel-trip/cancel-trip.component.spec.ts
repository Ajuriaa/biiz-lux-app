import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ButtonsModule, HeaderModule } from 'src/app/shared';
import { MaterialModule } from 'src/app/material';
import { BrowserModule } from '@angular/platform-browser';
import { ApolloTestingModule } from 'apollo-angular/testing';
import { CancelTripComponent } from './cancel-trip.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

describe('CancelTripComponent', () => {
  let component: CancelTripComponent;
  let fixture: ComponentFixture<CancelTripComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CancelTripComponent],
      imports: [
        HeaderModule,
        ButtonsModule,
        RouterModule,
        MaterialModule,
        BrowserModule,
        ApolloTestingModule,
        FormsModule,
        ReactiveFormsModule
      ],
      providers: [{ provide: ActivatedRoute, useValue: { params: ({}) } }]
    });
    fixture = TestBed.createComponent(CancelTripComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
