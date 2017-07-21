import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { SrcPipe } from './src.pipe';

@NgModule({
  declarations: [
    SrcPipe
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
      SrcPipe
  ],
  providers: []
})
export class SrcPipeModule {}