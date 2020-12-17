import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { IconsModule } from './icons.module';
import { ReactiveFormsModule } from '@angular/forms';
import { OverlayModule } from '@angular/cdk/overlay';
import { SharedComponentsModule } from './components/shared-components.module';

@NgModule({
  exports: [
    HttpClientModule,
    CommonModule,
    IconsModule,
    ReactiveFormsModule,
    OverlayModule,
    SharedComponentsModule,
  ]
})
export class SharedModule {}
