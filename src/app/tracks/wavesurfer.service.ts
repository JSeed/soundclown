import { Injectable, OnDestroy } from '@angular/core';
import WaveSurfer from 'wavesurfer.js';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class WaveSurferService implements OnDestroy {

  wavesurfer: WaveSurfer;

  private playingSubject = new BehaviorSubject(false);
  playing$ = this.playingSubject.asObservable();

  initialize(element: HTMLElement, url, peaks?): void {
    this.wavesurfer = WaveSurfer.create({
      backend: 'MediaElement',
      container: element,
      progressColor: '#a78bfa',
      barWidth: 4,
      barRadius: 3,
      cursorWidth: 1,
      height: 200,
      barGap: 3
    });

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

  jumpToSeconds(seconds: number) {
    this.wavesurfer.play(seconds);
  }

  ngOnDestroy() {
    if (this.wavesurfer) {
      this.wavesurfer.destroy();
    }
  }

}
