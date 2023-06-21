import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConvertedDocPreviewComponent } from './converted-doc-preview.component';

describe('ConvertedDocPreviewComponent', () => {
  let component: ConvertedDocPreviewComponent;
  let fixture: ComponentFixture<ConvertedDocPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConvertedDocPreviewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConvertedDocPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
