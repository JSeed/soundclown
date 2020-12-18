import { Injectable, OnDestroy } from '@angular/core';
import { TracksApiService } from './api/tracks-api.service';
import { Observable, Subscription } from 'rxjs';
import { Track } from '../models/track';
import { filter, startWith } from 'rxjs/operators';
import { NavigationStart, Router } from '@angular/router';
import { StateService } from './state.service';

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

    // Set the selected track based on the router URL
    this.subscriptions.add(this.router.events.pipe(
      filter<NavigationStart>((event) => event instanceof NavigationStart),
      startWith({ url: this.router.url }),
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

  private parseUrlTrackId(url): string {
    const matches = url.match('\/tracks\/(.+)');
    return matches ? matches[1] : null;
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }


}
