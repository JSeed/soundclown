import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Track } from '../../models/track';
import { ApiService } from './api.service';
import { PathResolver } from '../../utill/path-resolver';

@Injectable({
  providedIn: 'root',
})
export class TracksApiService {
  private readonly pathResolver = new PathResolver().withPart('tracks');

  constructor(
    private api: ApiService,
  ) {}


  getTrackList(): Observable<Track[]> {
    return this.api.get(this.pathResolver.resolve());
  }

}
