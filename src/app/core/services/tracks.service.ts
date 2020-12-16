import { Injectable, OnDestroy } from '@angular/core';
import { TracksApiService } from './api/tracks-api.service';
import { combineLatest, Observable, Subscription } from 'rxjs';
import { Track } from '../models/track';
import { filter, map, shareReplay, tap } from 'rxjs/operators';
import { NavigationStart, Router } from '@angular/router';
import { StateService } from './state/state.service';

interface TracksState {
  tracks: Track[];
  selectedTrackId: string;
}

const initialState: TracksState = {
  tracks: [],
  selectedTrackId: null,
};

@Injectable({ providedIn: 'root' })
export class TracksService extends StateService<TracksState> implements OnDestroy {

  tracks$: Observable<Track[]> = this.select(state => state.tracks);
  selectedTrackId$: Observable<string> = this.select(state => state.selectedTrackId);
  selectedTrack$: Observable<Track> = this.select((state) => {
    return this.state.tracks.find((track) => track.id === state.selectedTrackId);
  });


  private subscriptions = new Subscription();

  constructor(
    private tracksApi: TracksApiService,
    private router: Router,
  ) {
    super(initialState);

    this.load();

    this.subscriptions.add(this.router.events.pipe(
      filter<NavigationStart>((event) => event instanceof NavigationStart),
    ).subscribe((event) => {

      const trackId = this.parseUrlTrackId(event.url);
      if (trackId) {
        this.setState({ selectedTrackId: trackId });
      } else if (!trackId && this.state.selectedTrackId) {
        this.setState({ selectedTrackId: null });
      }
    }));

  }

  load(): void {
    this.subscriptions.add(this.tracksApi.getTrackList().subscribe((tracks) => this.setState({ tracks })));
  }

  selectTrack(track: Track): void {
    this.router.navigate(['tracks', track.id]);
  }

  clearSelectedTrack(): void {
    this.router.navigate(['tracks']);
  }

  private parseUrlTrackId(url) {
    const matches = url.match('\/tracks\/(.+)');
    return matches ? matches[1] : null;
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }


}
