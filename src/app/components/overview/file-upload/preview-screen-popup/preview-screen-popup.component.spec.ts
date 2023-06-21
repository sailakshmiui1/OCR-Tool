import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviewScreenPopupComponent } from './preview-screen-popup.component';

describe('PreviewScreenPopupComponent', () => {
  let component: PreviewScreenPopupComponent;
  let fixture: ComponentFixture<PreviewScreenPopupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PreviewScreenPopupComponent]
    });
    fixture = TestBed.createComponent(PreviewScreenPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
