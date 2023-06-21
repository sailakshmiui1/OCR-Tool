import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FailedDocumentComponent } from './failed-document.component';

describe('FailedDocumentComponent', () => {
  let component: FailedDocumentComponent;
  let fixture: ComponentFixture<FailedDocumentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FailedDocumentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FailedDocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
