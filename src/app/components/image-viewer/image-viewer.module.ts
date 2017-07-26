import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { ImageViewerComponent } from './image-viewer.component';

@NgModule({
  declarations: [
    ImageViewerComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
      ImageViewerComponent
  ],
  providers: []
})
export class ImageViewerModule {}