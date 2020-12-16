
import { Injectable, NgZone, OnDestroy } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import ResizeObserver from 'resize-observer-polyfill';

interface Observer {
  subject: Subject<any>;
  element: HTMLElement;
  observer: ResizeObserver;
}

@Injectable()
export class ResizeObserverService implements OnDestroy {

  private observers: Observer[] = [];

  constructor(
    private zone: NgZone,
  ) {}

  observe(element: HTMLElement): Observable<any> {
    const subject = new Subject<any>();
    const observer = new ResizeObserver(entries => {
      // Manually run it in the zone to trigger change detection (Angular doesn't handle events from ResizeObserver yet)
      this.zone.run(() => {
        subject.next(entries);
      });
    });

    observer.observe(element);
    this.observers.push({ subject, element, observer });

    return subject.asObservable();
  }

  ngOnDestroy(): void {
    this.observers.forEach(({ observer, element, subject }) => {
      subject.complete();
      observer.unobserve(element);
    });
  }
}
