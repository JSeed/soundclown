import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TracksService } from './tracks.service';
import { AnnotationsApiService } from './api/annotations-api.service';
import { filter, shareReplay, switchMap } from 'rxjs/operators';
import { Annotation } from '../models/annotation';

@Injectable({ providedIn: 'root' })
export class AnnotationsService {

  annotations$: Observable<Annotation[]>;

  constructor(
    private tracksService: TracksService,
    private annotationsApi: AnnotationsApiService,
  ) {

    this.annotations$ = this.tracksService.selectedTrack$.pipe(
      filter((track) => !!track),
      switchMap((track) => this.annotationsApi.listTrackAnnotations(track.id)),
      shareReplay(1),
    );
  }



}
