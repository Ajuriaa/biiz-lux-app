import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { ActivatedRoute } from '@angular/router';
import { ApolloTestingModule } from 'apollo-angular/testing';
import { ButtonsModule, HeaderModule } from 'src/app/shared';
import { AirportComponent } from './airport.component';

describe('AirportComponent', () => {
  let component: AirportComponent;
  let fixture: ComponentFixture<AirportComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AirportComponent],
      imports: [HeaderModule, ButtonsModule, MatSlideToggleModule, ApolloTestingModule],
      providers: [{ provide: ActivatedRoute, useValue: { params: ({}) } }]
    });
    fixture = TestBed.createComponent(AirportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
