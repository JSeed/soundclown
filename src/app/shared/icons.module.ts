import { NgModule } from '@angular/core';
import { FeatherModule } from 'angular-feather';
import { Play, Pause, Trash } from 'angular-feather/icons';

const icons = {
  Play,
  Pause,
  Trash,
};

@NgModule({
  imports: [
    FeatherModule.pick(icons),
  ],
  exports: [
    FeatherModule,
  ]
})
export class IconsModule {}
