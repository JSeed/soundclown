import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { TracksRoutingModule } from './tracks-routing.module';
import { TracksComponent } from './tracks/tracks.component';
import { TrackComponent } from './track/track.component';
import { TrackAnnotationsComponent } from './track-annotations/track-annotations.component';
import { AnnotationFormComponent } from './annotation-form/annotation-form.component';

@NgModule({
  imports: [
    SharedModule,
    TracksRoutingModule,
  ],
  declarations: [TracksComponent, TrackComponent, TrackAnnotationsComponent, AnnotationFormComponent]
})
export class TracksModule {}
