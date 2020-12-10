import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { TracksRoutingModule } from './tracks-routing.module';
import { TracksComponent } from './tracks/tracks.component';
import { TrackComponent } from './track/track.component';

@NgModule({
  imports: [
    SharedModule,
    TracksRoutingModule,
  ],
  declarations: [TracksComponent, TrackComponent]
})
export class TracksModule {}
