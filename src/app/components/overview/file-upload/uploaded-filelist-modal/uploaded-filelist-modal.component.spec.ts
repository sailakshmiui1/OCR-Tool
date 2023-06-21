import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadedFilelistModalComponent } from './uploaded-filelist-modal.component';

describe('UploadedFilelistModalComponent', () => {
  let component: UploadedFilelistModalComponent;
  let fixture: ComponentFixture<UploadedFilelistModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UploadedFilelistModalComponent]
    });
    fixture = TestBed.createComponent(UploadedFilelistModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
