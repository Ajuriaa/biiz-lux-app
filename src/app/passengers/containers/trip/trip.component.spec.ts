import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TripComponent } from './trip.component';
import { ButtonsModule, HeaderModule, MapsModule } from 'src/app/shared';
import { MapsComponent } from 'src/app/shared/maps/components/maps.component';
import { PassengersRoutingModule } from '../../passengers-routing.module';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

describe('TripComponent', () => {
  let component: TripComponent;
  let fixture: ComponentFixture<TripComponent>;

  const mockData = {
    snapshot: {
      queryParams: {
        paramMap: '1'
      }
    }
  };
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TripComponent, MapsComponent],
      imports: [HeaderModule, MapsModule, PassengersRoutingModule,ButtonsModule],
      providers: [
        { provide: ActivatedRoute, useValue: mockData},
      ]
    });
    fixture = TestBed.createComponent(TripComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
