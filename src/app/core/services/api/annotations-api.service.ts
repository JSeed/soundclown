import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Annotation, CreateAnnotationRequest } from '../../models/annotation';
import { PathResolver } from '../../util/path-resolver';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class AnnotationsApiService {

  private readonly pathResolver = new PathResolver().withPart('annotations');

  constructor(
    private api: ApiService,
  ) { }


  createAnnotation(annotation: CreateAnnotationRequest): Observable<Annotation> {
    return this.api.post(this.pathResolver.resolve(), annotation);
  }

  listTrackAnnotations(trackId: string): Observable<Annotation[]> {
    return this.api.get(this.pathResolver.resolve(), { trackId });
  }

  deleteTrackAnnotations(trackId: string, annotationId: string): Observable<void> {
    return this.api.delete(this.pathResolver.resolve(), { trackId, annotationId });
  }
}
