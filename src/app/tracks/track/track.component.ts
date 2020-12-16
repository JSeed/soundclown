import { AfterContentInit, Component, ElementRef, ViewChild } from '@angular/core';
import { TracksService } from '../../core/services/tracks.service';
import { catchError, filter, map, switchMap, take } from 'rxjs/operators';
import { WaveSurferService } from '../wavesurfer.service';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { ResizeObserverService } from '../../core/services/resize-observer.service';


@Component({
  selector: 'sc-track',
  templateUrl: './track.component.html',
  styleUrls: ['./track.component.scss'],
  viewProviders: [WaveSurferService, ResizeObserverService]
})
export class TrackComponent implements AfterContentInit {

  playing$ = this.waveSurferService.playing$;

  @ViewChild('waveform', {static: true}) waveformElement: ElementRef;

  constructor(
    public tracksService: TracksService,
    private waveSurferService: WaveSurferService,
    private http: HttpClient,
  ) {}

  togglePlayback(): void {
    this.waveSurferService.togglePlayback();
  }


  ngAfterContentInit(): void {
    this.tracksService.selectedTrack$.pipe(
      // TODO -  BUG - we shouldnt have to filter this...
      filter((val) => !!val),
      switchMap((track) => this.http.get(track.peaksUrl).pipe(
        catchError(() => of(undefined)),
        map((peaks) => ({ track, peaks })),
      )),
      take(1),
    ).subscribe(({ track, peaks }) => {
      this.waveSurferService.initialize(this.waveformElement.nativeElement, track.mediaUrl, peaks);
    });
  }
}
