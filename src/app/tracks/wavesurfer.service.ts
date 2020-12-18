import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import WaveSurfer from 'wavesurfer.js';
import CursorPlugin from 'wavesurfer.js/dist/plugin/wavesurfer.cursor.min.js';
import { ResizeObserverService } from '../core/services/resize-observer.service';
import { PlaybackStateService } from './playback-state.service';


@Injectable()
export class WaveSurferService implements OnDestroy {

  wavesurfer: WaveSurfer;

  private playingSubject = new BehaviorSubject(false);
  playing$ = this.playbackState.playing$;

  private subscriptions = new Subscription();

  constructor(
    private resizeObserver: ResizeObserverService,
    private playbackState: PlaybackStateService,
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

    this.wavesurfer.on('pause', () => this.playbackState.setPlaying(false));
    this.wavesurfer.on('play', () => this.playbackState.setPlaying(true));
    this.wavesurfer.on('finish', () => this.playbackState.setPlaying(false));

    this.wavesurfer.on('audioprocess', () => {
      const totalTime = this.wavesurfer.getDuration();
      const currentTime = this.wavesurfer.getCurrentTime();
      const remainingTime = totalTime - currentTime;

      this.playbackState.setTimes({ totalTime, currentTime, remainingTime });
    });
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
