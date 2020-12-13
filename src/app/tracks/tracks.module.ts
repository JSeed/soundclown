import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { TracksRoutingModule } from './tracks-routing.module';
import { TracksComponent } from './tracks/tracks.component';
import { TrackComponent } from './track/track.component';
import { TrackAnnotationsComponent } from './track-annotations/track-annotations.component';

@NgModule({
  imports: [
    SharedModule,
    TracksRoutingModule,
  ],
  declarations: [TracksComponent, TrackComponent, TrackAnnotationsComponent]
})
export class TracksModule {}
