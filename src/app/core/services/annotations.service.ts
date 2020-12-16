import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { TracksService } from './tracks.service';
import { AnnotationsApiService } from './api/annotations-api.service';
import { filter, switchMap, tap } from 'rxjs/operators';
import { Annotation, CreateAnnotationRequest } from '../models/annotation';
import { StateService } from './state/state.service';

interface AnnotationsState {
  annotations: Annotation[];
}

const initialState: AnnotationsState = {
  annotations: [],
};

@Injectable({ providedIn: 'root' })
export class AnnotationsService extends StateService<AnnotationsState>{

  annotations$ = this.select<Annotation[]>(state => state.annotations);

  constructor(
    private tracksService: TracksService,
    private annotationsApi: AnnotationsApiService,
  ) {
    super(initialState);


    this.tracksService.selectedTrack$.pipe(
      filter((track) => !!track),
      switchMap((track) => track ? this.annotationsApi.listTrackAnnotations(track.id) : of([])),
    ).subscribe((annotations) => {
      this.setState({ annotations });
    });
  }

  createAnnotation(annotation: CreateAnnotationRequest): Observable<Annotation> {
    return this.annotationsApi.createAnnotation(annotation).pipe(
      tap((res) => this.setState({ annotations: [...this.state.annotations, res] }))
    );
  }

  deleteAnnotation(annotation: Annotation): Observable<void> {
    return this.annotationsApi.deleteTrackAnnotations(annotation.trackId, annotation.id).pipe(
      tap(() => this.setState({ annotations: this.state.annotations.filter(({ id}) => id !== annotation.id) }))
    );
  }


}
