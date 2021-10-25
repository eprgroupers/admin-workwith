import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageChangeModelComponent } from './image-change-model.component';

describe('ImageChangeModelComponent', () => {
  let component: ImageChangeModelComponent;
  let fixture: ComponentFixture<ImageChangeModelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImageChangeModelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageChangeModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
