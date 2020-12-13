import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackAnnotationsComponent } from './track-annotations.component';

describe('TrackAnnotationsComponent', () => {
  let component: TrackAnnotationsComponent;
  let fixture: ComponentFixture<TrackAnnotationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrackAnnotationsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrackAnnotationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
