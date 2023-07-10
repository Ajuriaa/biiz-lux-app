import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ButtonsModule, HeaderModule } from 'src/app/shared';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/material';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';
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
        ReactiveFormsModule,
        MatRadioModule
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
