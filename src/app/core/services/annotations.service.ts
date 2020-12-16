import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TracksService } from './tracks.service';
import { AnnotationsApiService } from './api/annotations-api.service';
import { filter, switchMap } from 'rxjs/operators';
import { Annotation, CreateAnnotationRequest } from '../models/annotation';

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
    );
  }

  createAnnotation(annotation: CreateAnnotationRequest): Observable<Annotation> {
    return this.annotationsApi.createAnnotation(annotation);
  }


}
