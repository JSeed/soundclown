import { Injectable, OnDestroy } from '@angular/core';
import WaveSurfer from 'wavesurfer.js';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class WaveSurferService implements OnDestroy {

  wavesurfer: WaveSurfer;

  private playingSubject = new BehaviorSubject(false);
  playing$ = this.playingSubject.asObservable();
  initialize(element: HTMLElement, url): void {
    this.wavesurfer = WaveSurfer.create({
      container: element,
      // waveColor: '#D9DCFF',
      progressColor: '#a78bfa',
      // cursorColor: '#4353FF',
      barWidth: 4,
      barRadius: 3,
      cursorWidth: 1,
      height: 200,
      barGap: 3
    });

    this.wavesurfer.on('pause', () => this.playingSubject.next(false));
    this.wavesurfer.on('play', () => this.playingSubject.next(true));
    this.wavesurfer.on('seek', () => this.playingSubject.next(false));
    this.wavesurfer.on('finish', () => this.playingSubject.next(false));
    this.wavesurfer.load(url);
  }

  isPlaying() {
    return this.wavesurfer.isPlaying();
  }
  togglePlayback() {
    this.wavesurfer.playPause();
  }

  ngOnDestroy() {
    if (this.wavesurfer) {
      this.wavesurfer.destroy();
    }
  }
}
