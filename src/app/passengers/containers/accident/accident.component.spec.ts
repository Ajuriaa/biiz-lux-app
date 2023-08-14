import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { ApolloTestingModule } from 'apollo-angular/testing';
import { MaterialModule } from 'src/app/material';
import { ButtonsModule, HeaderModule } from 'src/app/shared';
import { AccidentComponent } from './accident.component';

describe('AccidentComponent', () => {
  let component: AccidentComponent;
  let fixture: ComponentFixture<AccidentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AccidentComponent],
      imports: [
        HeaderModule,
        ButtonsModule,
        RouterModule,
        MaterialModule,
        BrowserModule,
        BrowserAnimationsModule,
        ApolloTestingModule
      ],
      providers: [{ provide: ActivatedRoute, useValue: { params: ({}) } }]
    });
    fixture = TestBed.createComponent(AccidentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
