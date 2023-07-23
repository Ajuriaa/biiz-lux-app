import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ButtonsModule, HeaderModule } from 'src/app/shared';
import { HomeComponent } from './home.component';
import { ApolloTestingModule } from 'apollo-angular/testing';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomeComponent],
      imports: [HeaderModule, ButtonsModule, RouterModule, ApolloTestingModule],
      providers: [{ provide: ActivatedRoute, useValue: { params: ({})}}]
    });
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
