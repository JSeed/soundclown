import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { NavBarModule } from './nav-bar/nav-bar.module';

@NgModule({
  imports: [
    SharedModule,
  ],
  exports: [
    NavBarModule,
  ]
})
export class LayoutModule {}
