import { Injectable } from '@angular/core';
import { TracksApiService } from './api/tracks-api.service';
import { combineLatest, Observable } from 'rxjs';
import { Track } from '../models/track';
import { filter, map, shareReplay } from 'rxjs/operators';
import { NavigationStart, Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class TracksService {

  tracks$: Observable<Track[]>;
  selectedTrack$: Observable<Track>;
  private selectedTrackId$;

  constructor(
    private tracksApi: TracksApiService,
    private router: Router,
  ) {
    this.selectedTrackId$ = this.router.events.pipe(
      filter<NavigationStart>((event) => event instanceof NavigationStart),
      map((event) => {
        const matches = event.url.match('\/tracks\/(.+)');
        return matches ? matches[1] : null;
      }),
      shareReplay(1),
    );

    this.tracks$ = this.tracksApi.getTrackList().pipe(
      shareReplay(1),
    );

    this.selectedTrack$ = combineLatest([
      this.tracks$,
      this.selectedTrackId$,
    ]).pipe(
      map(([tracks, id]) => tracks.find((track) => track.id === id)),
    );
  }


  selectTrack(track: Track): void {
    this.router.navigate(['tracks', track.id]);
  }

  clearSelectedTrack(): void {
    this.router.navigate(['tracks']);
  }


}
