import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PassCodeComponent } from './pass-code.component';

describe('PassCodeComponent', () => {
  let component: PassCodeComponent;
  let fixture: ComponentFixture<PassCodeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PassCodeComponent]
    });
    fixture = TestBed.createComponent(PassCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
