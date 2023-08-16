import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ApolloTestingModule } from 'apollo-angular/testing';
import { ButtonsModule, HeaderModule } from 'src/app/shared';
import { IonicModule } from '@ionic/angular';
import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomeComponent],
      imports: [HeaderModule, ButtonsModule, RouterModule, ApolloTestingModule, IonicModule ],
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
