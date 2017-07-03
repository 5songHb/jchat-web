import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { JsonpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { JsonpService } from '../../services/request/jsonp.service';

import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from '../../services/common';
import { ChatPanelComponent } from './chat-panel.component';
import { DayPipeModule, TagPipeModule } from '../../pipes';

import { myModelDirective } from '../../directives';
import { EmojiModule } from '../emoji';
import { HoverTipModule } from '../hover-tip';
import { HoverEventModule } from '../../directives';
// import '../../../assets/css/viewer.min.css';
import { ImageViewerModule } from '../image-viewer';


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
    TagPipeModule,
    ImageViewerModule
  ],
  exports: [
      ChatPanelComponent
  ],
  providers: [
    JsonpService
  ]
})
export class ChatPanelModule {}