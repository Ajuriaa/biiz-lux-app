import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { ApolloTestingModule } from 'apollo-angular/testing';
import { ButtonsModule, HeaderModule } from 'src/app/shared';
import { UserInfoComponent } from './user-info.component';

describe('UserInfoComponent', () => {
  let component: UserInfoComponent;
  let fixture: ComponentFixture<UserInfoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HeaderModule, ButtonsModule, ApolloTestingModule],
      declarations: [UserInfoComponent],
      providers: [{ provide: ActivatedRoute, useValue: { params: ({}) } }]
    }).compileComponents();
    fixture = TestBed.createComponent(UserInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
