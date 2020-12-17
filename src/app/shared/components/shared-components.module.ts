import { NgModule } from '@angular/core';
import { IconsModule } from '../icons.module';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from './loader/loader.component';

@NgModule({
  imports: [
    CommonModule,
    IconsModule,
  ],
  declarations: [
    LoaderComponent
  ],
  exports: [
    LoaderComponent,
  ],
})
export class SharedComponentsModule {}
