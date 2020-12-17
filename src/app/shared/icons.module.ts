import { NgModule } from '@angular/core';
import { FeatherModule } from 'angular-feather';
import { Play, Pause, Trash, ChevronDown } from 'angular-feather/icons';

const icons = {
  Play,
  Pause,
  Trash,
  ChevronDown,
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
