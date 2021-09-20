import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlockedWorkersComponent } from './blocked-workers.component';

describe('BlockedWorkersComponent', () => {
  let component: BlockedWorkersComponent;
  let fixture: ComponentFixture<BlockedWorkersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BlockedWorkersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BlockedWorkersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
