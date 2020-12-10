import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TrackComponent } from './track/track.component';
import { TracksComponent } from './tracks/tracks.component';

const routes: Routes = [
  {
    path: '',
    component: TracksComponent,
  },
  {
    path: ':id',
    component: TrackComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TracksRoutingModule {}
