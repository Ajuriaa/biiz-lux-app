import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute , RouterModule } from '@angular/router';
import { ApolloTestingModule } from 'apollo-angular/testing';
import { HeaderModule } from 'src/app/shared';
import { FaqComponent } from './faq.component';

describe('FaqComponent', () => {
  let component: FaqComponent;
  let fixture: ComponentFixture<FaqComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FaqComponent],
      imports: [HeaderModule, RouterModule, ApolloTestingModule],
      providers: [{ provide: ActivatedRoute, useValue: { params: ({})}}]
    });
    fixture = TestBed.createComponent(FaqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
