import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Annotation } from 'src/app/core/models/annotation';
import { AnnotationsService } from 'src/app/core/services/annotations.service';
import { WaveSurferService } from '../wavesurfer.service';

@Component({
  selector: 'sc-track-annotations',
  templateUrl: './track-annotations.component.html',
  styleUrls: ['./track-annotations.component.scss']
})
export class TrackAnnotationsComponent {

  annotations$: Observable<Annotation[]>;

  constructor(
    private annotationsService: AnnotationsService,
    private waveSurfer: WaveSurferService,
  ) {
    this.annotations$ = this.annotationsService.annotations$;
  }

  annotationClicked(annotation: Annotation) {
    this.waveSurfer.jumpToSeconds(annotation.seconds);
  }
}
