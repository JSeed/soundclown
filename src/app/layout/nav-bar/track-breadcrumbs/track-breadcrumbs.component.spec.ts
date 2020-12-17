import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackBreadcrumbsComponent } from './track-breadcrumbs.component';

describe('TrackBreadcrumbsComponent', () => {
  let component: TrackBreadcrumbsComponent;
  let fixture: ComponentFixture<TrackBreadcrumbsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrackBreadcrumbsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrackBreadcrumbsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
