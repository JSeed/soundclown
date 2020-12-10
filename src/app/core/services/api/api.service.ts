import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable} from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { PathResolver } from '../../utill/path-resolver';

/**
 * Service for interacting with the REST API
 *
 * Exposes methods for making GET, POST, PUT, and DELETE requests
 * Request paths should be relative to the api base
 */
@Injectable({
  providedIn: 'root',
})
export class ApiService {

  private readonly baseHeaders = {};

  private readonly pathResolver: PathResolver;

  constructor(private http: HttpClient) {
    this.pathResolver = new PathResolver()
      .withPart(environment.baseUrl);
  }

  get(relativeUrl: string, params = {}, opts = {}): Observable<any> {
    const url = this.pathResolver.resolve(relativeUrl);

    return this.http.get(url, this.buildOptions({...opts, params}));
  }

  post(relativeUrl: string, body?: any, opts = {}): Observable<any> {
    const url = this.pathResolver.resolve(relativeUrl);

    return this.http.post(url, body, this.buildOptions(opts));
  }

  patch(relativeUrl: string, body?: any, opts = {}): Observable<any> {
    const url = this.pathResolver.resolve(relativeUrl);

    return this.http.patch(url, body, this.buildOptions(opts));
  }

  put(relativeUrl: string, body?: any, opts = {}): Observable<any> {
    const url = this.pathResolver.resolve(relativeUrl);

    return this.http.put(url, body, this.buildOptions(opts));
  }

  delete(relativeUrl: string, body?: any): Observable<any> {
    const url = this.pathResolver.resolve(relativeUrl);

    const opts = body ? { body } : {};
    return this.http.delete(url, this.buildOptions(opts));
  }

  private buildOptions(options: any = {}): any {
    return {
      ...options,
      headers: new HttpHeaders({
        ...this.baseHeaders,
        ...options.headers,
      }),
    };
  }
}
