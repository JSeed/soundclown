import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Annotation } from 'src/app/core/models/annotation';
import { AnnotationsService } from 'src/app/core/services/annotations.service';
import { WaveSurferService } from '../wavesurfer.service';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'sc-track-annotations',
  templateUrl: './track-annotations.component.html',
  styleUrls: ['./track-annotations.component.scss']
})
export class TrackAnnotationsComponent {

  annotations$: Observable<Annotation[]>;
  user$ = this.authService.user$;

  constructor(
    private annotationsService: AnnotationsService,
    private waveSurfer: WaveSurferService,
    private authService: AuthService,
  ) {
    this.annotations$ = this.annotationsService.annotations$;
  }

  annotationClicked(annotation: Annotation): void {
    this.waveSurfer.jumpToSeconds(annotation.seconds);
  }

  deleteAnnotation(annotation: Annotation): void {
    this.annotationsService.deleteAnnotation(annotation).subscribe(() => {});
  }
}
