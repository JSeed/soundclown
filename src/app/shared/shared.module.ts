import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { IconsModule } from './icons.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  exports: [
    HttpClientModule,
    CommonModule,
    IconsModule,
    ReactiveFormsModule,
  ]
})
export class SharedModule {}
