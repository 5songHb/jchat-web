import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { JsonpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from '../../services/common';
import { ChatPanelComponent } from './chat-panel.component';
import { DayPipeModule, EmojiPipeModule, EllipsisPipeModule, TimePipeModule } from '../../pipes';

import { myModelDirective } from '../../directives';
import { EmojiModule } from '../emoji';
import { HoverTipModule } from '../hover-tip';
import { HoverEventModule } from '../../directives';
import { ImageViewerModule } from '../image-viewer';
import{ StorageService } from '../../services/common';


@NgModule({
  declarations: [
    ChatPanelComponent,
    myModelDirective
  ],
  imports: [
    CommonModule,
    FormsModule,
    PerfectScrollbarModule.forRoot(PERFECT_SCROLLBAR_CONFIG),
    EmojiModule,
    JsonpModule,
    RouterModule,
    HoverTipModule,
    HoverEventModule,
    DayPipeModule,
    ImageViewerModule,
    EmojiPipeModule,
    EllipsisPipeModule,
    TimePipeModule
  ],
  exports: [
      ChatPanelComponent
  ],
  providers: [
    StorageService
  ]
})
export class ChatPanelModule {}