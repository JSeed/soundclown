import { NgModule } from '@angular/core';
import { FeatherModule } from 'angular-feather';
import {  Play, Pause } from 'angular-feather/icons';

const icons = {
  Play,
  Pause,
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
