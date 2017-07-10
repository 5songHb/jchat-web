import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { VideoComponent } from './video.component';
import { VideoTimePipeModule } from '../../pipes';

@NgModule({
  declarations: [
    VideoComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    VideoTimePipeModule
  ],
  exports: [
      VideoComponent
  ],
  providers: []
})
export class VideoModule {}