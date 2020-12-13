import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Annotation } from '../../models/annotation';
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

  listTrackAnnotations(trackId: string): Observable<Annotation[]> {
    return this.api.get(this.pathResolver.resolve(), { trackId });
  }
}
