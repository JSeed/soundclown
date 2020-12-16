import { Injectable, NgZone, OnDestroy } from '@angular/core';
import WaveSurfer from 'wavesurfer.js';
import TimelinePlugin from 'wavesurfer.js/dist/plugin/wavesurfer.timeline.min.js';
import MinimapPlugin from 'wavesurfer.js/dist/plugin/wavesurfer.minimap.min.js';
import CursorPlugin from 'wavesurfer.js/dist/plugin/wavesurfer.cursor.min.js';

import { BehaviorSubject, Subscription } from 'rxjs';
import { ResizeObserverService } from '../core/services/resize-observer.service';
import { debounceTime } from 'rxjs/operators';

@Injectable()
export class WaveSurferService implements OnDestroy {

  wavesurfer: WaveSurfer;

  private playingSubject = new BehaviorSubject(false);
  playing$ = this.playingSubject.asObservable();

  private subscriptions = new Subscription();

  constructor(
    private resizeObserver: ResizeObserverService,
  ) {}

  initialize(element: HTMLElement, url: string, peaks): void {
    this.wavesurfer = WaveSurfer.create({
      backend: 'MediaElement',
      container: element,
      progressColor: '#a78bfa',
      barWidth: 4,
      barRadius: 3,
      cursorWidth: 1,
      height: 200,
      barGap: 3,
      plugins: [
        CursorPlugin.create({
          showTime: true,
          opacity: 1,
          customShowTimeStyle: {
            'background-color': '#000',
            color: '#fff',
            padding: '2px',
            'font-size': '10px',
          },
        }),
      ]
    });

    this.subscriptions.add(
      this.resizeObserver.observe(element).pipe(debounceTime(100)).subscribe(() => this.wavesurfer.drawBuffer())
    );

    this.wavesurfer.on('pause', () => this.playingSubject.next(false));
    this.wavesurfer.on('play', () => this.playingSubject.next(true));
    this.wavesurfer.on('finish', () => this.playingSubject.next(false));
    this.wavesurfer.load(url, peaks);
  }

  isPlaying(): boolean {
    return this.wavesurfer.isPlaying();
  }

  togglePlayback(): void {
    this.wavesurfer.playPause();
  }

  jumpToSeconds(seconds: number): void {
    this.wavesurfer.setCurrentTime(seconds);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
    if (this.wavesurfer) {
      this.wavesurfer.destroy();
    }
  }

}
