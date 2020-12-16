import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { WaveSurferService } from '../wavesurfer.service';
import { AnnotationsService } from '../../core/services/annotations.service';

@Component({
  selector: 'sc-annotation-form',
  templateUrl: './annotation-form.component.html',
  styleUrls: ['./annotation-form.component.scss']
})
export class AnnotationFormComponent implements OnInit {

  @Input() trackId: string;
  pending = false;
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private wavesurfer: WaveSurferService,
    private annotationsService: AnnotationsService,
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      message: ['', [Validators.required]],
    });
  }

  handleSubmit(): void {
    if (this.form.valid && !this.pending) {
      this.pending = true;

      this.annotationsService.createAnnotation({
        message: this.form.get('message').value,
        seconds: this.wavesurfer.wavesurfer.getCurrentTime(),
        user: 'unknown', // TODO - profile service
        trackId: this.trackId,
      }).subscribe(() => {
        this.form.reset();
        this.pending = false;
      }, (err) => {
        console.error('Failed to create annotation:', err);
        this.pending = false;
      });
    }
  }
}
