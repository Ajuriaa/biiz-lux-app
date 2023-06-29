import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { HeaderModule } from 'src/app/shared';
import { CustomerServiceComponent } from './customer-service.component';


describe('CustomerServiceComponent', () => {
  let component: CustomerServiceComponent;
  let fixture: ComponentFixture<CustomerServiceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CustomerServiceComponent],
      imports: [HeaderModule],
      providers: [{ provide: ActivatedRoute, useValue: { params: ({})}}]
      
    });
    fixture = TestBed.createComponent(CustomerServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
