import { Component } from '@angular/core';
import { TracksService } from '../../../core/services/tracks.service';

@Component({
  selector: 'sc-track-breadcrumbs',
  templateUrl: './track-breadcrumbs.component.html',
  styleUrls: ['./track-breadcrumbs.component.scss']
})
export class TrackBreadcrumbsComponent {

  selectedTrack$ = this.tracksService.selectedTrack$;

  constructor(
    private tracksService: TracksService,
  ) { }

  showTracks(): void {
    this.tracksService.clearSelectedTrack();
  }
}
