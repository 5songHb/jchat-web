import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { ImageViewerComponent } from './image-viewer.component';
import { SrcPipeModule } from '../../pipes';

@NgModule({
  declarations: [
    ImageViewerComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    SrcPipeModule
  ],
  exports: [
      ImageViewerComponent
  ],
  providers: []
})
export class ImageViewerModule {}