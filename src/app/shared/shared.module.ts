import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { IconsModule } from './icons.module';

@NgModule({
  exports: [
    HttpClientModule,
    CommonModule,
    IconsModule,
  ]
})
export class SharedModule {}
