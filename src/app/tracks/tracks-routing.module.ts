import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TrackComponent } from './track/track.component';
import { TracksComponent } from './tracks/tracks.component';
import { AuthGuard } from '@auth0/auth0-angular';

const routes: Routes = [
  {
    path: '',
    component: TracksComponent,
    canActivate: [AuthGuard],
  },
  {
    path: ':id',
    canActivate: [AuthGuard],
    component: TrackComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TracksRoutingModule {}
