import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ButtonsModule, HeaderModule, MapsModule } from 'src/app/shared';
import { ApolloTestingModule } from 'apollo-angular/testing';
import { ActivatedRoute } from '@angular/router';
import { PassengersRoutingModule } from '../../passengers-routing.module';
import { ProgramTripComponent } from './program-trip.component';

describe('ProgramTripComponent', () => {
  let component: ProgramTripComponent;
  let fixture: ComponentFixture<ProgramTripComponent>;

  const mockData = {
    snapshot: {
      queryParams: {
        paramMap: '1'
      }
    }
  };
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProgramTripComponent],
      imports: [HeaderModule, MapsModule, PassengersRoutingModule, ButtonsModule, ApolloTestingModule ],
      providers: [
        { provide: ActivatedRoute, useValue: mockData},
      ]
    });
    fixture = TestBed.createComponent(ProgramTripComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
