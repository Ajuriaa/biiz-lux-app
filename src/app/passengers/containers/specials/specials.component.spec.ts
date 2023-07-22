import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { ApolloTestingModule } from 'apollo-angular/testing';
import { ButtonsModule, HeaderModule } from 'src/app/shared';
import { SpecialsComponent } from './specials.component';

describe('SpecialsComponent', () => {
  let component: SpecialsComponent;
  let fixture: ComponentFixture<SpecialsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SpecialsComponent],
      imports: [HeaderModule, ButtonsModule, ApolloTestingModule],
      providers: [{ provide: ActivatedRoute, useValue: { params: ({}) } }]
    });
    fixture = TestBed.createComponent(SpecialsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
