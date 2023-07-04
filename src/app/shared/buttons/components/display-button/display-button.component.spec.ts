import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayButtonComponent } from './display-button.component';

describe('DisplayButtonComponent', () => {
  let component: DisplayButtonComponent;
  let fixture: ComponentFixture<DisplayButtonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DisplayButtonComponent]
    });
    fixture = TestBed.createComponent(DisplayButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
