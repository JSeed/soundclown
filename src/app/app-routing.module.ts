import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'tracks',
    loadChildren: () => import('./tracks/tracks.module').then(m => m.TracksModule),
  },
  {
    path: '',
    redirectTo: 'tracks',
    pathMatch: 'full',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
