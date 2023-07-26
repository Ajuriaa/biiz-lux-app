import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserInfoComponent } from './user-info.component';
import { ButtonsModule, HeaderModule } from 'src/app/shared';
import { ApolloTestingModule } from 'apollo-angular/testing';


describe('UserInfoComponent', () => {
  let component: UserInfoComponent;
  let fixture: ComponentFixture<UserInfoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HeaderModule, ButtonsModule, ApolloTestingModule],
      declarations: [UserInfoComponent]
    }).compileComponents();
    fixture = TestBed.createComponent(UserInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
