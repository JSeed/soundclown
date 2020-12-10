import { AfterContentInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TracksService } from '../../core/services/tracks.service';
import { filter, take } from 'rxjs/operators';
import { WaveSurferService } from '../wavesurfer.service';


@Component({
  selector: 'sc-track',
  templateUrl: './track.component.html',
  styleUrls: ['./track.component.scss'],
  viewProviders: [WaveSurferService]
})
export class TrackComponent implements AfterContentInit {

  playing$ = this.waveSurferService.playing$;

  @ViewChild('waveform', {static: true}) waveformElement: ElementRef;

  constructor(
    public tracksService: TracksService,
    private waveSurferService: WaveSurferService,
  ) {}

  togglePlayback(): void {
    this.waveSurferService.togglePlayback();
  }


  ngAfterContentInit(): void {
    this.tracksService.selectedTrack$.pipe(
      // TODO -  BUG - we shouldnt have to filter this...
      filter((val) => !!val),
      take(1),
    ).subscribe((track) => {
      this.waveSurferService.initialize(this.waveformElement.nativeElement, track.url);
    });
  }
}
