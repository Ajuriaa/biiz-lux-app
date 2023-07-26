import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WhiteButtonComponent } from '../white-button/white-button.component';
import { DisplayButtonComponent } from './display-button.component';
import { ActivatedRoute, RouterModule } from '@angular/router';

describe('DisplayButtonComponent', () => {
  let component: DisplayButtonComponent;
  let fixture: ComponentFixture<DisplayButtonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterModule],
      declarations: [DisplayButtonComponent, WhiteButtonComponent],
      providers: [{ provide: ActivatedRoute, useValue: { params: ({})}}]
    });
    fixture = TestBed.createComponent(DisplayButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
