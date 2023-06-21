import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConvertedDocumentComponent } from './converted-document.component';

describe('ConvertedDocumentComponent', () => {
  let component: ConvertedDocumentComponent;
  let fixture: ComponentFixture<ConvertedDocumentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConvertedDocumentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConvertedDocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
