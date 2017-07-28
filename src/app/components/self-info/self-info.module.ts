import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { SelfInfoComponent } from './self-info.component';
import { SelectModule } from '../select';
import { EllipsisPipeModule, SanitizePipeModule } from '../../pipes';

@NgModule({
  declarations: [
    SelfInfoComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    SelectModule,
    EllipsisPipeModule,
    SanitizePipeModule
  ],
  exports: [
      SelfInfoComponent
  ],
  providers: []
})
export class SelfInfoModule {}