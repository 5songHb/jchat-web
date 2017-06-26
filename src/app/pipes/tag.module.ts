import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { TagPipe } from './tag.pipe';

@NgModule({
  declarations: [
    TagPipe
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
      TagPipe
  ],
  providers: []
})
export class TagPipeModule {}